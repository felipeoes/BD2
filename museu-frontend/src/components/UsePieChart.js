import React from 'react';
import { PieChart } from './PieChart';

const data = [
  {
    artista_1: 9,
    artista_2 :20,
    artista_3 :30,
    artista_4 :8,
    artista_5 :12,
    artista_6 :100,
    artista_7 :100,
    artista_8 :30,
    artista_9 :100
  }

]


export const UsePieChart = function () {
  return (
    <PieChart data={[data]} />
  );
}
