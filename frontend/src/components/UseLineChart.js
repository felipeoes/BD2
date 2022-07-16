import React from 'react';
import {BarChart} from './BarChart';
import { LineChart } from './LineChart';


const data = [
  {date: '2021-01-01', value: 135.98},
  {date: '2021-02-01', value: 147.49},
  {date: '2021-03-01', value: 146.93},
  {date: '2021-04-01', value: 139.89},
  {date: '2021-05-01', value: 125.6},
  {date: '2021-06-01', value: 108.13},
  {date: '2021-07-01', value: 115},
  {date: '2021-08-01', value: 118.8},
  {date: '2021-09-01', value: 124.66},
  {date: '2021-10-01', value: 113.44},
  {date: '2021-11-01', value: 115.78},
  {date: '2021-12-01', value: 113.46},
  {date: '2022-01-01', value: 122},
  {date: '2022-02-01', value: 118.68},
  {date: '2022-03-01', value: 117.45},
  {date: '2022-04-01', value: 118.7},
  {date: '2022-05-01', value: 119.8},
  {date: '2022-06-01', value: 115.81},
  {date: '2022-07-01', value: 118.76},
  {date: '2022-08-01', value: 125.3},
  {date: '2022-09-01', value: 125.25},
  {date: '2022-10-01', value: 124.5},
  {date: '2022-11-01', value: 123.62},
  {date: '2022-12-01', value: 123},
]


export const UseLineChart = function () {
  return (
    <LineChart data={[data,'date','value']} />
  );
}
