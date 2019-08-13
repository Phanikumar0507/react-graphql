import React, {Component} from 'react';
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {TimeSeries, Index} from "pondjs";


import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    styler,
    Resizable
} from "react-timeseries-charts";


const data = [
    ["2017-01-24T00:00", 0.01],
    ["2017-01-24T01:00", 0.13],
    ["2017-01-24T02:00", 0.07],
    ["2017-01-24T03:00", 0.04],
    ["2017-01-24T04:00", 0.33],
    ["2017-01-24T05:00", 0],
    ["2017-01-24T06:00", 0],
    ["2017-01-24T07:00", 0],
    ["2017-01-24T08:00", 0.95],
    ["2017-01-24T09:00", 1.12],
    ["2017-01-24T10:00", 0.66],
    ["2017-01-24T11:00", 0.06],
    ["2017-01-24T12:00", 0.3],
    ["2017-01-24T13:00", 0.05],
    ["2017-01-24T14:00", 0.5],
    ["2017-01-24T15:00", 0.24],
    ["2017-01-24T16:00", 0.02],
    ["2017-01-24T17:00", 0.98],
    ["2017-01-24T18:00", 0.46],
    ["2017-01-24T19:00", 0.8],
    ["2017-01-24T20:00", 0.39],
    ["2017-01-24T21:00", 0.4],
    ["2017-01-24T22:00", 0.39],
    ["2017-01-24T23:00", 0.28]
];


const colors = [
    "#581845",
    "#C70039",
    "#FF5733",
    "#FFC300",
    "#900C3F",
    "#DAF7A6"
];


const animatedComponents = makeAnimated();

export default class MetricSelection extends Component {

    state = {
        selectedOption: null,
    };

    handleChange = selectedOption => {
        this.setState({selectedOption});
        console.log(`Option selected:`, selectedOption);
    };

    render() {

        const options = [
            {value: 'tubingPressure', label: 'Casing Pressure'},
            {value: 'oilTemperature', label: 'oilTemperature'}
        ];
        const {selectedOption} = this.state;
        const series = new TimeSeries({
            name: "hilo_rainfall",
            columns: ["index", "precip"],
            points: data.map(([d, value]) => [
                Index("1h", new Date(d)).asString(),
                value
            ])
        });
        return (
            <React.Fragment>
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    onChange={this.handleChange}
                    value={selectedOption}
                    options={options}
                />
                <Resizable>
                    <ChartContainer timeRange={series.range()}>
                        <ChartRow height="150">
                        </ChartRow>
                    </ChartContainer>
                </Resizable>
            </React.Fragment>
        );
    }
};
