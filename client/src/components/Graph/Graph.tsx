import React, { useRef } from "react";
import { IgrLegendModule, IgrCategoryChartModule, IgrLegend, IgrCategoryChart } from "igniteui-react-charts";
import { ExchangeRate } from "../../types/exchangeRate";
import "./Graph.css";


[IgrLegendModule, IgrCategoryChartModule].forEach(m => m.register());

type Props = {
    data: ExchangeRate[];
};

const Graph: React.FC<Props> = ({ data }) => {
    const legendRef = useRef<IgrLegend | null>(null);

    return (
        <div className="container sample">
            <IgrLegend
                ref={(ref) => {
                    legendRef.current = ref;
                }}
                orientation="Horizontal"
            />

            <div className="container fill">
                <IgrCategoryChart
                    chartType="Line"
                    dataSource={data}
                    categoryMemberPath="month"
                    valueMemberPath="average_rate"
                    yAxisTitle="USD"
                    xAxisTitle="Month"
                    legend={legendRef.current!}
                />
            </div>
        </div>
    );
};

export default Graph;
