import { useD3 } from './services/hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

export const PieChart = function (dataInput) {
  const [data,variavel] = dataInput.data;
  
  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 500;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      

    },
    [data.length]
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 500,
        width: "50rem",
        marginRight: "0px",
        marginLeft: "0px",
      }}
      className='barchart'
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}