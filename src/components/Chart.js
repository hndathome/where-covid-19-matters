import React, { useEffect, useState } from 'react'
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLegend, VictoryTooltip, VictoryVoronoiContainer } from "victory";

function Chart(props) {
    const { series, seriesNames, xValue, yValue } = props;
    const [maxima, setMaxima] = useState([]);
    const colors = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];

    useEffect(() => {
        const localMaxima = series.map(
            (dataset) => Math.max(...dataset.map((d) => d[yValue]))
        )

        setMaxima(localMaxima);
    }, [series, yValue]);

    return (
        <VictoryChart theme={VictoryTheme.material} padding={55} minDomain={{ y: 0 }} scale={{ x: "time" }}
            containerComponent={
                <VictoryVoronoiContainer
                    voronoiDimension="x"
                    labels={({ datum }) => `y: ${datum[yValue]}`}
                    labelComponent={
                        <VictoryTooltip
                            cornerRadius={0}
                            flyoutStyle={{ fill: "white" }}
                        />}
                    style={{
                        touchAction: "auto"
                    }}
                />}
        >
            <VictoryAxis
                fixLabelOverlap
                style={{ tickLabels: { padding: 16, fontSize: 10 } }}
            />

            <VictoryAxis dependentAxis
                style={{
                    ticks: { padding: maxima[0] > 999999 ? -15 : -7 },
                    tickLabels: { textAnchor: maxima[0] > 999999 ? "start" : "end" }
                }}
            />

            {series.length > 0 && series.map((dataset, index) => <VictoryLine data={dataset} x={xValue} y={yValue} key={index}
                style={{
                    data: { stroke: colors[index], strokeWidth: ({ active }) => active ? 4 : 2 }, labels: { fontSize: 15, fill: colors[index] },
                    parent: { border: "1px solid #ccc" }
                }} />)}

            <VictoryLegend x={5} y={5}
                orientation="horizontal"
                gutter={10}
                colorScale={colors}
                data={seriesNames}
            />
        </VictoryChart>
    );
};
export default Chart