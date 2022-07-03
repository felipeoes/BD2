import { useD3 } from '../hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

export const LineChart = function (dataInput) {
    let [data,eixoX,eixoY] = dataInput.data;
    
    const margin = {top: 10, right: 30, bottom: 30, left: 60};
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;


    data = data.map(
        function(instancia){
            return {
                'date':d3.timeParse("%Y-%m-%d")(instancia['date']),
                'value': instancia['value']
            }
        }
    );

    const ref = useD3(
        (svg) => {       

            // Define o eixo X
            const x = d3.scaleTime()            
                .domain(
                    d3.extent(
                        data, function(d) {
                            return d[eixoX];
                        }
                    )
                )
                .range([ 0, width ]);

            
            // aplica as alteracoes no elemento do eixo x
            svg.select(".x-axis")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x));

            // Add Y axis
            const y = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) {return d[eixoY]; })])
                .range([ height, 0 ]);

            // aplica as alteracoes no elemento do eixo x
            svg.select(".y-axis")
                .call(d3.axisLeft(y));

            svg.select('.path-line')
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr(
                    "d",
                    d3.line()
                        .x(
                            function(d) {                                
                                // console.log(x(d[eixoX]));
                                return x(d[eixoX])
                            }
                        )
                        .y(
                            function(d) { 
                                // console.log(y(d[eixoY]));
                                return y(d[eixoY]) 
                            }
                        )
                );
        },
        [data.length]
    );

    

    return (
        <svg
          ref={ref}
          style={{
            height: height + margin.top + margin.bottom,
            width: width + margin.left + margin.right,
            marginRight: "0px",
            marginLeft: "0px",
          }}
        >
          <g className="plot-area" />
          <g className="x-axis" />
          <g className="y-axis" />
          <path className='path-line'></path>
        </svg>
      );
}
