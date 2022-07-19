'use strict';
import { useD3 } from './services/hooks/useD3';
import React, { useEffect,useRef } from 'react';
import * as d3 from 'd3';

export const TreeMap = function (dataInput) {
  // Usado para obter o with dos elementos
  // const refWidth = useRef(null);
  
  try {
      if(dataInput.data[0]!=null){

      const data = dataInput.data[0];
      const listaPais = dataInput.data[1];
      

      const ref = useD3(
        (svg) => {
          
          d3.selectAll('.'+ dataInput.tituloGrafico).remove();
          // obtenho o valor do 100% height e width
          const height = svg['_groups'][0][0].clientHeight;
          const width = svg['_groups'][0][0].clientWidth;
          const margin = 50;


          // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
          const radius = Math.min(width, height) / 2 - margin;
          

          const g = svg.select('.treemap-center');



          g.attr("transform", `translate(${width / 2},${height / 2})`);

          // stratify the data: reformatting for d3.js
          const root = d3.stratify()
            .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
            .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
            (data);

          root.sum(function(d) { return +d.value })   // Compute the numeric value for each entity


          // Then d3.treemap computes the position of each element of the hierarchy
          // The coordinates are added to the root object above
          d3.treemap()
          .size([width, height])
          .padding(4)
          (root);

          // prepare a color scale
          const lista_cores = [
            'rgb(195,164,97)','rgb(88,123,83)','rgb(93,146,170)','rgb(190,140,142)'
          ];
          const color = d3.scaleOrdinal()
            .domain(listaPais)
            .range(lista_cores)


            

          // use this information to add rectangles:
          svg
            .selectAll("rect")
            .data(root.leaves())
            .join("rect")
              .attr('x', function (d) { return d.x0; })
              .attr('y', function (d) { return d.y0; })
              .attr('width', function (d) { return d.x1 - d.x0; })
              .attr('height', function (d) { return d.y1 - d.y0; })
              .style("stroke", "black")
              .style("fill", function(d){ return color(d.parent.data.name)})
              .attr('class',dataInput.tituloGrafico);

          // and to add the text labels
          svg
            .selectAll("text")
            .data(root.leaves())
            .join("text")
              .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
              .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
              .text(function(d){ return d.data.name})
              .attr("font-size", "15px")
              .attr("fill", "white")
              .attr('class',dataInput.tituloGrafico);;


        },
        [data.length]
      );

      return (
        <div>
          <h1 
          className='titleGraph'
            style={{
              height:"10%",
              paddingBottom: '3rem',
              // zIndex:'-1'
              
            }}>
              {dataInput.tituloGrafico}
          </h1>
          <svg
            ref={ref}
            style={{
              height: '90%',
              width: '100%',
              // paddingLeft: "100px",
              marginLeft: "0px",
              // zIndex: 100
            }}
            className='treemap'
          >
            <g className="treemap-center" />
          </svg>
        </div>
      );
    }
  }
  catch (error){
    return (
      <div>
        <h1 
        className='titleGraph'
          style={{
            height:"10%"
          }}>
            {dataInput.tituloGrafico}
        </h1>
        <svg
          style={{
            height: '90%',
            width: '100%',
            // paddingLeft: "100px",
            marginLeft: "0px",
          }}
          className='treemap'
        >
          <g className="treemap-center" />
        </svg>
      </div>
    );
  }
}