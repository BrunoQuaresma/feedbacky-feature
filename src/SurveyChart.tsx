import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import useSWR from 'swr'
import { ResponsiveBar } from '@nivo/bar'
import { Feature } from './types'
import groupBy from 'lodash/groupBy'
import mapValues from 'lodash/mapValues'
import uniq from 'lodash/uniq'

type SurveyChartProps = {
  surveyId: string
}

type Vote = {
  id: string
  voted_at: string
  feature: Feature
}

type VotesResponse = {
  votes: Vote[]
}

const colors = [
  '#FED7D7',
  '#FEEBC8',
  '#FEFCBF',
  '#C6F6D5',
  '#B2F5EA',
  '#BEE3F8',
  '#C3DAFE',
  '#E9D8FD',
  '#FED7E2'
].reverse()

const getSurveyVotes = (id: string) =>
  axios
    .get<VotesResponse>(`/api/surveys/${id}/votes`)
    .then(response => response.data.votes)

const selectFeatureId = (vote: Vote) => vote.feature.name
const selectDate = (vote: Vote) => dayjs(vote.voted_at).format('YYYY-MM-DD')
const groupByDate = (votes: Vote[]) => groupBy(votes, selectDate)
const groupByFeature = (votes: Vote[]) => groupBy(votes, selectFeatureId)
const groupByDateAndFeature = (votes: Vote[]) =>
  mapValues(groupByDate(votes), groupByFeature)

const SurveyChart: React.FC<SurveyChartProps> = ({ surveyId }) => {
  const [chartData, setChartData] = useState()
  const [features, setFeatures] = useState()
  const { data: votes } = useSWR(
    [surveyId, `surveys/${surveyId}/votes`],
    getSurveyVotes
  )

  useEffect(() => {
    if (!votes) return

    const groupedData = groupByDateAndFeature(votes)

    setChartData(
      Object.keys(groupedData).map(date => ({
        date,
        ...Object.keys(groupedData[date]).reduce((current, key) => {
          return {
            ...current,
            [key]: groupedData[date][key].length
          }
        }, {})
      }))
    )

    setFeatures(uniq(votes.map(vote => vote.feature.name)))
  }, [votes])

  if (!chartData) {
    return <p>Loading...</p>
  }

  return (
    <ResponsiveBar
      data={chartData}
      keys={features}
      indexBy="date"
      margin={{ top: 50, right: 240, bottom: 50, left: 60 }}
      padding={0.3}
      colors={bar => colors[features.indexOf(bar.id)]}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Date',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Number of votes',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  )
}

export default SurveyChart
