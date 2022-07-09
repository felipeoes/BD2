'use strict';
import { useD3 } from './services/hooks/useD3';
import React, { useEffect,useRef } from 'react';
import * as d3 from 'd3';

export const PieChart = function (dataInput) {
  // Usado para obter o with dos elementos
  const refWidth = useRef(null);

  const [data] = dataInput.data[0];
  
  const ref = useD3(
    (svg) => {
      
      // obtenho o valor do 100% height e width
      const height = svg['_groups'][0][0].clientHeight;
      const width = svg['_groups'][0][0].clientWidth;
      const margin = 50;


      // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
      const radius = Math.min(width, height) / 2 - margin;
      

      const g = svg.select('.pie-center');
      g.attr("transform", `translate(${width / 2},${height / 2})`);

      // set the color scale

      const color = d3.scaleOrdinal()
        .domain(Object.keys(data))
        .range(d3.schemeDark2);

      // Compute the position of each group on the pie:
      const pie = d3.pie().value(d=>{
        return d[1];
      });

      const data_ready = pie(Object.entries(data));

      // The arc generator
      const arc = d3.arc()
        .innerRadius(radius * 0.5)         // This is the size of the donut hole
        .outerRadius(radius * 0.8)

      // Another arc that won't be drawn. Just for labels positioning
      const outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9)


      g.selectAll('allSlices')
      .data(data_ready)
      .join('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data[1]))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)


      // Add the polylines between chart and labels:
      g.selectAll('allPolylines')
        .data(data_ready)
        .join('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', function(d) {
          const posA = arc.centroid(d) // line insertion in the slice
          const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
          const posC = outerArc.centroid(d); // Label position = almost the same as posB
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
          posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
          return [posA, posB, posC]
        })

      g.selectAll('allLabels')
        .data(data_ready)
        .join('text')
        .text(d => d.data[0])
        .attr('transform', function(d) {
            const pos = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return `translate(${pos})`;
        })
        .style('text-anchor', function(d) {
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
        })

    },
    [data.length]
  );

  useEffect(
    ()=> {
      // console.log('width = ', ref.current.offsetWidth);      
    },
    []
  );

  return (
    <svg
      // ref={ref}
      ref={ref}
      style={{
        height: '100%',
        width: '100%',
        // paddingLeft: "100px",
        marginLeft: "0px",
      }}
      className='piechart'
    >
      <g className="pie-center" />
    </svg>
  );
}