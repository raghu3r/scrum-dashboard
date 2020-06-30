import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "./BarChart.css";

const jsonData = [
  {
    meanValue: 6,
    cats: [
      "Drive FO Combined Sprint 37",
      "Drive FO Combined Sprint 38",
      "Drive FO Combined Sprint 39",
      "Drive FO Combined Sprint 40",
      "Drive FO Combined Sprint 41",
      "Drive FO Combined Sprint 42",
    ],
    results: [
      {
        storypoints: "48.00",
        mean: "68.00",
        lastModifiedDate: "2020-06-14T03:03:00.411Z",
      },
      {
        storypoints: "101.00",
        mean: "71.00",
        lastModifiedDate: "2020-06-14T03:03:00.411Z",
      },
      {
        storypoints: "79.00",
        mean: "76.00",
        lastModifiedDate: "2020-06-14T03:03:00.411Z",
      },
      {
        storypoints: "76.00",
        mean: "77.00",
        lastModifiedDate: "2020-06-14T03:03:00.411Z",
      },
      {
        storypoints: "76.00",
        mean: "75.00",
        lastModifiedDate: "2020-06-14T03:03:00.411Z",
      },
      {
        storypoints: "95.00",
        mean: "76.00",
        lastModifiedDate: "2020-06-14T03:03:00.411Z",
      },
    ],
    lastModifiedOn: "2020-06-14T03:03:00.411Z",
  },
];

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  createBarData(data) {
    const initialData = { labels: [], datasets: [] };
    return data.reduce((acc, c) => {
      acc["labels"] = c.cats;
      const sp = c.results.map((a) => a.storypoints);
      const mean = c.results.map((a) => a.mean);
      acc["datasets"].push({
        label: "storypoints",
        backgroundColor: "rgb(184,184,184)",
        data: sp,
      });
      acc["datasets"].push({
        label: "mean",
        backgroundColor: "rgba(38, 166, 91, 1)",
        data: mean,
      });
      return acc;
    }, initialData);
  }
  componentDidMount() {
    this.setState({
      postdata: this.createBarData(jsonData),
    });
    fetch(
      "http://api-int.connectcdk.com/api/dm-enterprise-kpi-api/v1/get/sprint-velocity/148/2281"
    ).then((response) => {
      if (response.data) {
        this.setState({
          // rawData: response.data
          postdata: this.createBarData(response.data.json()),
        });
      }
    });
  }

  render() {
    return (
      <div className="BarChart">
        <Bar
          data={this.state.postdata}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    );
  }
}

export default BarChart;
