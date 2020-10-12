import React, { useEffect, useState } from 'react'
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLegend, VictoryTooltip, VictoryVoronoiContainer } from "victory";

function Chart(props) {
    const { series, seriesNames, xValue, yValue } = props;

    const [xOffsets, setXOffsets] = useState([50, 200, 350])
    const [tickPadding, setTickPadding] = useState([-7, 0, -15])
    const [anchors, setAnchors] = useState(["end", "end", "start"])
    const [maxima, setMaxima] = useState([]);
    const colors = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];

    useEffect(() => {
        const localMaxima = series.map(
            (dataset) => Math.max(...dataset.map((d) => d[yValue]))
        )
        const tickPadding0 = localMaxima[0] > 999999 ? -15 : -7;
        const anchor0 = localMaxima[0] > 999999 ? "start" : "end";
        //dynamic offsets 300 to share 
        //50,200,350  incrementer 150
        //50,150,250,350 incrementer 100
        //50,125,200,275,350 incrementer 75
        if (series.length < 4) {
            setXOffsets([50, 200, 350]);
            setTickPadding([tickPadding0, 0, -15]);
            setAnchors([anchor0, "end", "start"]);
        }
        else if (series.length > 4) {
            setXOffsets([50, 125, 200, 275, 350])
            setTickPadding([tickPadding0, 0, 0, 0 - 15]);
            setAnchors([anchor0, "end", "end", "end", "start"]);
        }
        else {
            setXOffsets([50, 150, 250, 350]);
            setTickPadding([tickPadding0, 0, 0, -15]);
            setAnchors([anchor0, "end", "end", "start"]);
        }

        setMaxima(localMaxima);
    }, [series, yValue]);

    return (
        <VictoryChart
            theme={VictoryTheme.material}
            width={400} height={400}
            domain={{ y: [0, 1.05] }}
            padding={50}
            containerComponent={
                <VictoryVoronoiContainer
                    voronoiDimension="x"
                    labels={({ datum }) => `y: ${datum[yValue]}`}
                    labelComponent={
                        <VictoryTooltip
                            cornerRadius={0}
                            flyoutStyle={{ fill: "white" }}
                        />}
                />}
        >
            <VictoryAxis
                fixLabelOverlap
                style={{ tickLabels: { padding: 16, fontSize: 12 } }}
            />
            {series.map((d, i) => (
                <VictoryAxis dependentAxis
                    key={i}
                    offsetX={xOffsets[i]}
                    style={{
                        axis: { stroke: colors[i] },
                        ticks: { padding: tickPadding[i] },
                        tickLabels: { fill: colors[i], textAnchor: anchors[i] }
                    }}
                    // Use normalized tickValues (0 - 1)
                    tickValues={[0.25, 0.5, 0.75, 1]}
                    // Re-scale ticks by multiplying by correct maxima
                    tickFormat={(t) => Math.round(t * maxima[i])}
                />
            ))}

            {series.map((d, i) => (
                <VictoryLine
                    key={i}
                    data={d}
                    style={{ data: { stroke: colors[i], strokeWidth: ({ active }) => active ? 4 : 2 }, labels: { fontSize: 15, fill: colors[i] } }}
                    x={xValue}
                    y={(datum) => datum[yValue] / maxima[i]}
                />
            ))}

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