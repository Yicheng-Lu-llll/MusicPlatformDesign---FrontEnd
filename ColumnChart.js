import { PieChart } from 'react-minimal-pie-chart';
import Chart from 'react-google-charts';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useState } from 'react'
let ColumnChart = (props) => {
  // let titleList = ['calmness','happiness','fear','sadness','anger','excitement'];
  let percentageList = props.info.musicScoreList;
  let data = [
    ["Element", "Density", { role: "style" }],
    ["calmness", percentageList[0], "gold"],
    ["happiness", percentageList[1], "#b87333"], // RGB value
    ["fear", percentageList[2], "silver"], // English color name
    ["sadness", percentageList[3], "blue"], // CSS-style declaration
    ["anger", percentageList[4], "red"], // CSS-style declaration
    ["excitement", percentageList[5], "purple"], // CSS-style declaration
  ];
  // manual change
  // console.log(props.info.musicName)
  // if (props.info.musicName === "I-am-You") {
  //   data[2][1] = data[2][1] - 0.08;//happiness
  //   data[4][1] = data[4][1] + 0.04 //sadness
  //   data[3][1] = data[3][1] + 0.04 //fear
  // }
  // if (props.info.musicName === "Happy-cloudy-day") {
  //   data[2][1] = data[2][1] - 0.1;//happiness
  //   data[4][1] = data[4][1] + 0.1 //sadness
  // }
  // if (props.info.musicName === "loving-bird") {
  //   data[2][1] = data[2][1] + 0.15;//happiness
  //   data[4][1] = data[4][1] - 0.15; //sadness
  // }
  // if (props.info.musicName === "lovely-motor") {
  //   data[2][1] = data[2][1] + 0.15;//happiness
  //   data[4][1] = data[4][1] - 0.15; //sadness
  // }
  // if (props.info.musicName === "lost_forest") {
  //   data[2][1] = data[2][1] - 0.15;//happiness
  //   data[3][1] = data[3][1] + 0.15 //fear
  // }
  // if (props.info.musicName === "Alice-Madness-Returns-Theme") {
  //   data[2][1] = data[2][1] - 0.05;//happiness
  //   data[3][1] = data[3][1] + 0.05 //fear
  // }
  // if (props.info.musicName === "Flaming-Fry") {
  //   data[4][1] = data[4][1] - 0.05 //sadness
  //   data[6][1] = data[6][1] + 0.05 //excitement
  // }
  // if (props.info.musicName === "summer") {
  //   data[1][1] = data[1][1] + 0.05 //calmness
  //   data[6][1] = data[6][1] - 0.05 //excitement
  // }
  // if (props.info.musicName === "Immolation") {
  //   data[2][1] = data[2][1] - 0.08;//happiness
  //   data[6][1] = data[6][1] + 0.08; //excitement
  // }

  // manual change







  let [isChange, setISChange] = useState(false)
  let changeHandler = () => {
    console.log("hi!");
    setISChange((pre) => {
      return !pre;
    })
  }
  let pieContent = (
    <div>
      <a onClick={changeHandler}>.</a>
      <PieChart
        animate={true}
        animationDuration={1000}
        data={[
          { title: 'calmness', value: props.info.musicScoreList[0], color: '#E38627', key: 1 },
          { title: 'H', value: props.info.musicScoreList[1], color: '#C13C37', key: 2 },
          { title: 'F', value: props.info.musicScoreList[2], color: '#6A2135', key: 3 },

        ]}
      // label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
      // label={({ dataEntry }) => dataEntry.title}
      />

    </div>
  )
  let columnContent = (
    <div>
      <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
    </div>
  )
  let content = pieContent;
  if (isChange) {
    content = columnContent;
  }

  return (
    <div>
      {/* {pieContent} */}
      {columnContent}
    </div>
  )
}
export default ColumnChart
