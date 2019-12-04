import { query as q, values } from 'faunadb'
import db from '../../../_db'

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

export default (id: string, voter_id: string) => {
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

  return Promise.all<SurveyQueryResult, VotesQueryResult>([
    surveyQuery,
    votesQuery
  ])
}
