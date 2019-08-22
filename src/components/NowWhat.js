import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {useQuery} from "urql";
import _filter from 'lodash/filter';
import _last from 'lodash/last';
import _foreach from 'lodash/forEach';
import _map from 'lodash/map';
import _max from 'lodash/max';
import _min from 'lodash/min';
import _uniq from 'lodash/uniq';
import _includes from 'lodash/includes';

import {TimeSeries} from "../../node_modules/pondjs/lib/entry";

import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    Resizable,
    styler
} from "react-timeseries-charts";

import MetricSelection from './Selection';

const calcThirtyMinutesAgo = () => new Date() - 30 * 60 * 1000;
const thirtyMinutesAgo = calcThirtyMinutesAgo();
let points = [];
let objLabel = [];
const query = `query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at
      value
      metric
      unit
    }
  }
}`;

let chartObj = [];
const colors = [
    "#00580d",
    "#C70039",
    "#FF5733",
    "#fef6ff",
    "#900C3F",
    "#f70028"
];
const useStyles = makeStyles({
    wrapper: {
        height: "100vh"
    },
    header: {
        display: "flex",
        width: "100%"
    },
    metrics: {
        width: "60%",
        display: "flex",
        flexWrap: "wrap"
    },
    selection: {
        width: "40%"
    },
    card: {
        width: "15%",
        marginRight: "1rem",
        marginBottom: "1rem",
        float: "right"
    }
});

class NowWhat extends React.Component {

    constructor() {
        super();
        this.state = {
            cards: [],
            measureMent: []
        };
    }

    metrics = (obj) => {
        if (obj !== null) {
            this.state.cards = obj;
            this.setState({
                cards: obj
            })
        } else {
            chartObj = [];
            objLabel = [];
            this.setState({
                cards: []
            })
        }
    };

    renderCard = (cards) => {
        return cards.map((object, i) => {
            return (
                <CardRender obj={object} key={i}/>
            )
        });
    };

    render() {
        return (
            <div style={{height: "100vh"}}>
                <MetricSelection selectedMetrics={this.metrics}/>
                {this.state.cards.length !== 0 ? this.renderCard(this.state.cards) : ""}
                <br/>
                <RenderChart/>
            </div>
        );
    }

};

const CardRender = (props) => {
    const {obj} = props;
    const classes = useStyles();
    const [queryResult, fetching] = useQuery(
        {
            query,
            variables: {
                input: [{
                    metricName: "casingPressure",
                    after: thirtyMinutesAgo
                }, {
                    metricName: "tubingPressure",
                    after: thirtyMinutesAgo
                }, {
                    metricName: "oilTemp",
                    after: thirtyMinutesAgo
                }, {
                    metricName: "injValveOpen",
                    after: thirtyMinutesAgo
                }, {
                    metricName: "waterTemp",
                    after: thirtyMinutesAgo
                }, {
                    metricName: "flareTemp",
                    after: thirtyMinutesAgo
                }]
            }
        },
        ["casingPressure", "tubingPressure", "oilTemp", "injValveOpen", "waterTemp", "flareTemp"]
    );
    let lastPressureValue = 0;

    if (fetching) {
        if (queryResult.data !== undefined) {
            let res = _filter(queryResult.data.getMultipleMeasurements, filterObj => {
                return filterObj.metric === obj.label;
            });

            lastPressureValue = _last(res[0].measurements).value;
            if (!_includes(objLabel, obj.label)) {
                objLabel.push(obj.label);
                objLabel = _uniq(objLabel);
                lastPressureValue = _last(res[0].measurements).value;
                chartObj.push({
                    res,
                    lastPressureValue
                });
            }
        }
    }
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant={"h6"}>{obj.label}</Typography>
                <Typography variant={"h3"}>{lastPressureValue} </Typography>
            </CardContent>
        </Card>
    );
};


class RenderChart extends React.Component {

    render() {
        if (!chartObj || chartObj.length === 0) return null;

        function getArrayValues(obj) {
            return [obj.at, obj.value]
        }

        let finalTemp = [];
        let value = _foreach(chartObj, obj => {
            _foreach(obj.res, obj => {
                console.log(":::obj.measurements", obj.measurements)
                let timeStamp = _map(obj.measurements, getArrayValues);
                let value = _map(obj.measurements, "value");
                let metric = _uniq(_map(obj.measurements, "metric"));
                let unit = _uniq(_map(obj.measurements, "unit"));
                let maxTime = _max(timeStamp);
                let minTime = _min(timeStamp);
                let maxValue = _max(value);
                let minValue = _min(value);
                points = timeStamp;
                finalTemp = finalTemp.concat({
                    timeStamp,
                    value,
                    metric,
                    unit,
                    maxTime,
                    maxValue,
                    minTime,
                    minValue
                });
            });
        });
        const series = new TimeSeries({
            name: "Value - Serious",
            columns: ["time", "value"],
            points
        });
        const style = {
            value: {
                stroke: "#a02c2c",
                opacity: 0.2
            }
        };

        return (
            <Grid container direction="column">
                <Resizable>
                    <ChartContainer titleStyle={{fill: "#555", fontWeight: 500}}
                                    timeRange={series.range()} format="%b '%y" timeAxisTickCount={5}>
                        <ChartRow trackerShowTime={true}
                                  trackerInfoHeight={10 + [].length * 16}
                                  trackerInfoWidth={140}
                                  height="300">
                            {
                                finalTemp.map((obj, i) => {
                                    console.log("::::obj.timeStamp", obj.timeStamp)
                                    console.log("::::obj.metric", obj.metric[0])
                                    let series = new TimeSeries({
                                        name: "Value - Serious",
                                        columns: ["time", "value"],
                                        points: obj.timeStamp
                                    });
                                    return (
                                        <YAxis id={obj.metric[0]}
                                               key={i}
                                               label={obj.metric[0]}
                                               min={series.min()}
                                               max={series.max()}
                                               width="60"
                                               type="linear"
                                        />
                                    )
                                })
                            }
                            <Charts>
                                {
                                    finalTemp.map((obj, i) => {
                                        const style = styler(
                                            finalTemp.map(s => ({
                                                key: "value",
                                                color: colors[i],
                                                selected: "#2CB1CF"
                                            })));
                                        let series = new TimeSeries({
                                            name: "Value - Serious",
                                            columns: ["time", "value"],
                                            points: obj.timeStamp
                                        });
                                        return (
                                            <LineChart key={i} column={["value"]} axis={obj.metric[0]} series={series}
                                                       style={style}/>
                                        )
                                    })
                                }
                            </Charts>
                        </ChartRow>
                    </ChartContainer>
                </Resizable>
            </Grid>
        )
    }
}

export default NowWhat;
