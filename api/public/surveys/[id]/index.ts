import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import db from '../../../_db'
import { parseFeatureDoc } from '../../../_utils'

type SurveyQueryResult = {
  ref: values.Ref
  data: {
    user: values.Ref
  }
  features: {
    ref: values.Ref
    data: {}
  }[]
}

type VotesQueryResult = values.Page<{
  data: {
    feature: values.Ref
  }
}>

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('access-control-allow-origin', '*')
  res.setHeader(
    'access-control-allow-headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { id, voter_id } = req.query

  if (!voter_id) {
    return res
      .status(400)
      .json({
        message: 'voter_id not found.'
      })
      .end()
  }

  const surveyQuery = db.query<SurveyQueryResult>(
    q.Let(
      {
        surveyRef: q.Ref(q.Collection('surveys'), id),
        surveyDoc: q.Get(q.Var('surveyRef'))
      },
      q.Merge(q.Var('surveyDoc'), {
        features: q.Map(
          q.Select(['data', 'features'], q.Var('surveyDoc')),
          featureRef =>
            q.Merge(q.Get(featureRef), {
              number_of_votes: q.Count(
                q.Match(
                  q.Index('votes_by_survey_and_feature'),
                  q.Var('surveyRef'),
                  featureRef
                )
              )
            })
        ),
        number_of_votes: q.Count(
          q.Match(q.Index('votes_by_survey'), q.Var('surveyRef'))
        )
      })
    )
  )

  const votesQuery = db.query<VotesQueryResult>(
    q.Map(
      q.Paginate(
        q.Match(
          q.Index('votes_by_survey_and_voter_id'),
          q.Ref(q.Collection('surveys'), id),
          voter_id
        )
      ),
      x => q.Get(x)
    )
  )

  const [survey, votes] = await Promise.all<
    SurveyQueryResult,
    VotesQueryResult
  >([surveyQuery, votesQuery])

  res.json({
    survey: {
      ...survey.data,
      user: undefined,
      id: survey.ref.id,
      features: survey.features.map(feature => ({
        ...parseFeatureDoc(feature),
        voted: votes.data.some(vote => vote.data.feature.id === feature.ref.id)
      }))
    }
  })
}
