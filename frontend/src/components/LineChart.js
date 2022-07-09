import { useD3 } from './services/hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

export const LineChart = function (dataInput) {
    let [data,eixoX,eixoY] = dataInput.data;
    
    // const margin = {top: 10, right: 30, bottom: 30, left: 60};
    const padding = {top: 10, right: 30, bottom: 0, left: 30};
    const width = 500 - padding.left - padding.right;
    const height = 450 - padding.top - padding.bottom;


    data = data.map(
        function(instancia){
            return {
                [eixoX] :d3.timeParse("%Y-%m-%d")(instancia[eixoX]),
                [eixoY]: instancia[eixoY]
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
                            // console.log(d);
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
                .attr("stroke-width", 1.5)
                .attr(
                    "d",
                    d3.line()                    
                        .x(
                            function(d) {                
                                return x(d[eixoX])
                            }
                            )
                            .y(
                            function(d) { 
                                return y(d[eixoY]) 
                            }
                        )
                );
        },
        [data]
    );

    

    return (
        <svg
          ref={ref}
          style={{
            // height: height + margin.top + margin.bottom,
            height: '100%',
            width: '100%',
            paddingRight: padding.right,
            paddingLeft: padding.left,
            paddingTop: padding.top,
            paddingBottom: padding.bottom,
          }}
          className='linechart'
        >
          <g className="plot-area" />
          <g className="x-axis" />
          <g className="y-axis" />
          <path className='path-line'></path>
        </svg>
      );
}
