/* eslint-env node */
import React, { Component } from 'react'
// import { Radar } from 'react-chartjs-2'
import Radar from 'react-d3-radar'
function organizingDataFromBackend (){}
class RadarChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chartData: props.chartData,
      labels: props.categoryList
    }
  console.log("LABELS ARE"+ this.state.labels)

  }

  render () {
    return (
      <div className='chart'>
        <Radar
          data={{
            labels: this.labels,
            datasets: [
              {
                label: 'Trend',
                data: [
                  100,
                  200,
                  300
                ],
                backgroundColor: [
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(255, 99, 132, 0.6)'
                ]
              }
            ],
            hoverBackgroundColor: [
              '#FF6384'
            ]
          }}
          width={400}
          height={350}
          options={{
            legend: {
              display: 'ACTIVE RATE',
              position: 'bottom'
            }
          }}
        />
      </div>
    )
  }
}
export default RadarChart
