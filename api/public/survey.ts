import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import db from '../_db'
import { parseFeatureDoc } from '../_utils'

type QueryResult = {
  apiToken: {
    ref: values.Ref,
    data: {
      user: values.Ref
    }
  }
  survey: {
    ref: values.Ref,
    data: {
      user: values.Ref
    },
    features: {
      ref: values.Ref,
      data: {}
    }[]
  }
}

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('access-control-allow-origin', '*')
  res.setHeader('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  if(req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const apiTokenValue = req.headers.authorization?.replace('Bearer ', '')

  if(!apiTokenValue) {
    return res.status(400).json({
      message: 'API Token not found on Authorization header.'
    }).end()
  }

  const { id } = req.query

  const { apiToken, survey } = await db.query<QueryResult>({
    apiToken: q.Get(
      q.Match(
        q.Index('api_token_by_value'),
        apiTokenValue
      )
    ),
    survey: q.Let(
      {
        surveyRef: q.Ref(q.Collection('surveys'), id),
        surveyDoc: q.Get(q.Var('surveyRef'))
      },
      q.Merge(q.Var('surveyDoc'), {
        features: q.Map(
          q.Select(['data', 'features'], q.Var('surveyDoc')),
          featureRef => q.Get(featureRef)
        ),
        number_of_votes: q.Count(
          q.Match(q.Index('votes_by_survey'), q.Var('surveyRef'))
        )
      })
    )
  })

  if(apiToken.data.user.id !== survey.data.user.id) {
    return res.status(404).json({
      message: 'Survey not found.'
    }).end()
  }

  res.json({
    survey: {
      ...survey.data,
      user: undefined,
      id: survey.ref.id,
      features: survey.features.map(parseFeatureDoc),
    }
  })
}
