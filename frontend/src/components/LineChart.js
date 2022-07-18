import { useD3 } from './services/hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

export const LineChart = function (dataInput) {
    
    const padding = {top: 10, right: 30, bottom: 40, left: 40};
    try {
        if(dataInput.data[0].length >= 0){
            let [data,eixoX,eixoY] = dataInput.data;
        
            // const margin = {top: 10, right: 30, bottom: 30, left: 60};
            // const width = 500 - padding.left - padding.right;
            // const height = 450 - padding.top - padding.bottom;
        
        
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
                    const height = svg['_groups'][0][0].clientHeight;
                    const width = svg['_groups'][0][0].clientWidth;    
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
                        .range([ padding.left, width ]);
        
                    
                    // aplica as alteracoes no elemento do eixo x
                    svg.select(".x-axis")
                        .attr("transform", `translate(0, ${height - padding.bottom})`)
                        .call(d3.axisBottom(x));
        
                    // Add Y axis
                    const y = d3.scaleLinear()
                        .domain([0, d3.max(data, function(d) {return d[eixoY]; })])
                        .range([ height - padding.bottom, 0 ]);
        
                    // aplica as alteracoes no elemento do eixo x
                    // .attr("transform", `translate(300, 0)`)
                    svg.select(".y-axis")
                        .attr("transform", 'translate(' + padding.left + ', 0)')
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
                                        // console.log(x(d[eixoX]));
                                        return x(d[eixoX])
                                    }
                                    )
                                    .y(
                                    function(d) { 
                                        return y(d[eixoY]) 
                                    }
                                )
                        );
                    svg
                        .select(".y-axis--label")
                        .attr("text-anchor", "end")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 10)
                        .attr("x", -height/2)
                        .text(dataInput.tituloEixoY);
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
                        // height: height + margin.top + margin.bottom,
                        height: '90%',
                        width: '100%',
                        paddingRight: padding.right,
                        paddingLeft: padding.left,
                        paddingTop: padding.top,
                        // paddingBottom: padding.bottom,
                    }}
                    className='linechart'
                    >
                        <g className="plot-area" />
                        <g className="x-axis" />
                        <g className="y-axis" />
                        <path className='path-line'></path>
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
                // ref={ref}
                style={{
                    // height: height + margin.top + margin.bottom,
                    height: '90%',
                    width: '100%',
                    paddingRight: padding.right,
                    paddingLeft: padding.left,
                    paddingTop: padding.top,
                    // paddingBottom: padding.bottom,
                }}
                className='linechart'
                >
                    <g className="plot-area" />
                    <g className="x-axis" />
                    <g className="y-axis" />
                    <path className='path-line'></path>
                    <text className = 'y-axis--label'></text>
                    <text className = 'x-axis--label'></text>
                </svg>
            </div>
        ); 
    }    
}
