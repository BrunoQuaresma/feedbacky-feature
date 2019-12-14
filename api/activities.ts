import { NowRequest, NowResponse } from '@now/node'
import { query as q, values } from 'faunadb'
import { makeClient } from './_db'

type ReplyDoc = {
  ref: values.Ref
  data: {
    created_at: {
      value: string
    }
  }
}

type VoteDoc = {
  ref: values.Ref
  data: {
    voted_at: {
      value: string
    }
  }
}

type QueryResult = values.Page<ReplyDoc | VoteDoc>

export default async (req: NowRequest, res: NowResponse) => {
  const userClient = makeClient(req.cookies.token)

  const response = await userClient.query<QueryResult>(
    q.Map(
      q.Paginate(
        q.Union(
          q.Join(
            q.Match(q.Index('forms_by_user'), q.Identity()),
            q.Index('last_replies_by_form')
          ),
          q.Join(
            q.Match(q.Index('surveys_by_user'), q.Identity()),
            q.Index('last_votes_by_survey')
          )
        )
      ),
      x => q.Get(x)
    )
  )

  res.json({
    activities: response.data.map((activity: any) => {
      const type = activity.ref.collection.id
      const source =
        type === 'replies'
          ? {
              ...activity.data,
              created_at: activity.data.created_at.value,
              form: undefined,
              form_id: activity.data.form.id
            }
          : {
              ...activity.data,
              created_at: activity.data.voted_at.value,
              survey: undefined,
              survey_id: activity.data.survey.id,
              feature: undefined,
              feature_id: activity.data.feature.id
            }

      return {
        type,
        source
      }
    })
  })
}
