/* eslint-disable react-hooks/rules-of-hooks */
import { useD3 } from './services/hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

export const BarChart = function (dataInput) {
  const [data,valorX,valorY] = dataInput.data;
  
  try {
    if(dataInput.data[0].length >= 0){
      const ref = useD3(
        (svg) => {
          const height = svg['_groups'][0][0].clientHeight;
          const width = svg['_groups'][0][0].clientWidth;
          const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    
          const x = d3
            .scaleBand()
            .domain(data.map((d) => d[valorX]))
            .rangeRound([margin.left, width - margin.right])
            .padding(0.1);
    
          const y1 = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d[valorY])])
            .rangeRound([height - margin.bottom, margin.top]);
    
          const xAxis = (g) =>
            g.attr("transform", `translate(0,${height - margin.bottom})`).call(
              d3
                .axisBottom(x)
                .tickValues(
                  d3
                    .ticks(...d3.extent(x.domain()), width / 40)
                    .filter((v) => x(v) !== undefined)
                )
                .tickSizeOuter(0)
            );
    
          const y1Axis = (g) =>
            g
              .attr("transform", `translate(${margin.left},0)`)
              .call(d3.axisLeft(y1).ticks(null, "s"))
              .call((g) => g.select(".domain").remove())
              .call((g) =>
              g
                  .append("text")
                  .attr("x", -margin.left)
                  .attr("y", 10)
                  .attr("fill", "currentColor")
                  .attr("text-anchor", "start")
                  .text(data.y1)
              );
    
          svg.select(".x-axis").call(xAxis);
          svg.select(".y-axis").call(y1Axis);
    
          svg
            .select(".plot-area")        
            .selectAll(".columnsHistogram")
            .data(data)
            .join("rect")
            .attr("class", "columnsHistogram")
            .attr("x", (d) => x(d[valorX]))
            .attr("width", x.bandwidth())
            .attr("y", (d) => y1(d[valorY]))
            .attr("height", (d) => y1(0) - y1(d[valorY]));

          
          svg
            .select(".y-axis--label")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", "1rem")
            .attr("x", -height/2)
            .text(dataInput.tituloEixoY);
    
    
            // svg.select(".x-axis--label")
        },
        [data]
      );
    
      return (
        <div>
          <h1 
          className='titleGraph'
            style={{
              height:"10%"
            }}>
              {dataInput?.tituloGrafico}
          </h1>
          <svg
            ref={ref}
            style={{
              height: "90%",
              width: "100%",
              marginRight: "0px",
              marginLeft: "0px",
            }}
            className='barchart'
          >
            <g className="plot-area" />
            <g className="x-axis" />
            <g className="y-axis" />
            <text className = 'y-axis--label'></text>
            <text className = 'x-axis--label'></text>
          </svg>
        </div>
      );    
    }
  } catch (error) {
    return (
      <div>
        <h1 
        className='titleGraph'
          style={{
            height:"10%"
          }}>
            {dataInput?.tituloGrafico}
        </h1>
        <svg
          style={{
            height: "90%",
            width: "100%",
            marginRight: "0px",
            marginLeft: "0px",
          }}
          className='barchart'
        >
          <g className="plot-area" />
          <g className="x-axis" />
          <g className="y-axis" />
          <text className = 'y-axis--label'></text>
          <text className = 'x-axis--label'></text>
        </svg>
      </div>
    );        
  }
  
}