import React from "react";
import {render} from "react-dom";

import {Card, Typography, CardContent, Container, Grid} from "@material-ui/core";

import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.cjs";
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    Baseline,
    styler,
    Resizable
} from "react-timeseries-charts";

import {TimeSeries} from "pondjs";
import data from "./data";

const animatedComponents = makeAnimated();


// DATA

let points = data.widget[0].data.reverse();

const series = new TimeSeries({
    name: "USD_vs_EURO",
    columns: ["time", "value"],
    points
});

points = data.widget[0].data;
const seriesNew = new TimeSeries({
    name: "Value - Serious",
    columns: ["time", "value"],
    points
});

const baselineStyle = {
    line: {
        stroke: "red",
        strokeWidth: 1,
        opacity: 0.4,
        strokeDasharray: "none"
    },
    label: {
        fill: "steelblue"
    }
};

const baselineStyleLite = {
    line: {
        stroke: "steelblue",
        strokeWidth: 1,
        opacity: 0.5
    },
    label: {
        fill: "steelblue"
    }
};

const baselineStyleExtraLite = {
    line: {
        stroke: "steelblue",
        strokeWidth: 1,
        opacity: 0.2,
        strokeDasharray: "1,1"
    },
    label: {
        fill: "steelblue"
    }
};


const style = {
    value: {
        stroke: "#a02c2c",
        opacity: 0.2
    }
};


const styles = {
    value: {
        stroke: "#FF5733",
        opacity: 0.2
    },
    selected:"#6610f2",
    color:"#FF5733"
};

class App extends React.Component {
    state = {
        selectedOption: []
    };
    handleChange = selectedOption => {
        if (selectedOption === null) {
            this.setState({selectedOption: []});
        } else {
            this.setState({selectedOption});
        }
    };


    getCards = () => {
        return (
            this.state.selectedOption.map(obj => {
                return (
                    <Card style={{
                        width: "100%",
                        marginRight: "1rem",
                        marginBottom: "1rem"
                    }}>
                        <CardContent>
                            <Typography variant={"h6"}>{obj.label}</Typography>
                            <Typography variant={"h3"}>{obj.value}</Typography>
                        </CardContent>
                    </Card>
                )
            })
        );
    };

    render() {
        const {selectedOption} = this.state;
        const options = [
            {value: 'tubingPressure', label: 'Casing Pressure'},
            {value: 'oilTemperature', label: 'oilTemperature'}
        ];
        return (
            <div className="App" style={{width:700}}>
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            onChange={this.handleChange}
                            value={selectedOption}
                            options={options}
                        />
                    </div>
                    <div>
                        {this.state.selectedOption.length > 0 ? this.getCards() : ''}
                    </div>
                </div>
                <Resizable>
                    <ChartContainer
                        title="Tube Pressure"
                        titleStyle={{fill: "#555", fontWeight: 500}}
                        timeRange={series.range()}
                        format="%b '%y"
                        timeAxisTickCount={5}
                    >
                        <ChartRow height="150">
                            <YAxis
                                id="price"
                                label="Oil Pressure"
                                min={series.min()}
                                max={series.max()}
                                format="$,.2f"
                                width="60"
                                type="linear"
                            />
                            <YAxis
                                id="axis"
                                label="Tube Pressure"
                                min={series.max()}
                                max={series.min()}
                                format=".2f"
                                width="60"
                                type="linear"
                            />
                            <Charts>
                                <LineChart key={0} column={["value"]} axis="price" series={series} style={style}/>
                                <LineChart key={1} column={["value"]} axis="axis" series={seriesNew} style={styles}/>
                                <Baseline
                                    axis="price"
                                    style={baselineStyleLite}
                                    value={series.max()}
                                    label="Max"
                                    position="right"
                                />
                                <Baseline
                                    axis="price"
                                    style={baselineStyleLite}
                                    value={series.min()}
                                    label="Min"
                                    position="right"
                                />
                                <Baseline
                                    axis="axis"
                                    style={baselineStyleExtraLite}
                                    value={series.avg() - series.stdev()}
                                />
                                <Baseline
                                    axis="price"
                                    style={baselineStyleExtraLite}
                                    value={series.avg() + series.stdev()}
                                />
                                <Baseline
                                    axis="price"
                                    style={baselineStyle}
                                    value={series.avg()}
                                    label="Avg"
                                    position="right"
                                />
                            </Charts>
                        </ChartRow>
                    </ChartContainer>
                </Resizable>
            </div>
        );
    }
}

export default App;
