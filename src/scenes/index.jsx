import React from 'react'
import {connect} from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.cjs";


const data = require('./bike.json');

const animatedComponents = makeAnimated();


class index extends React.Component {


    state = {
        selectedOption: []
    };


    componentWillMount() {
        const scripts = document.createElement('script');
        let script = ` Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv", function (err, rows) {
                function unpack(rows, key) {
                    return rows.map(function (row) {
                        return row[key];
                    });
                }
                var trace1 = {
                    type: "scatter",
                    mode: "lines",
                    name: 'Tubling Pressure',
                    x: unpack(rows, 'Date'),
                    y: unpack(rows, 'AAPL.High'),
                    line: {color: '#17BECF'}
                }

                var trace2 = {
                    type: "scatter",
                    mode: "lines",
                    name: 'Oil Pressure',
                    x: unpack(rows, 'Date'),
                    y: unpack(rows, 'AAPL.Low'),
                    line: {color: '#7F7F7F'}
                }
\            
                var data = [trace1, trace2];

                var layout = {
                    title: 'Sample Demo Chart',
                };

                Plotly.newPlot('myDiv', data, layout, {showSendToCloud: true});
                
            })`;
        setTimeout(() => {
            document.body.appendChild(scripts);
            scripts.type = 'text/javascript';
            scripts.innerHTML = script
        });
    }

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
        return (
            <div>

                <div className="container">
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
                    </div>

                    {selectedOption.length > 0 ? this.state.selectedOption.map(obj => {
                        return (
                            <div className="row">
                                <div className="card" style={{width: "18rem"}}>
                                    <div className="card-body">
                                        <h5 className="card-title alert-dark">{this.state.value}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : null}
                </div>

                <div id="myDiv"/>
            </div>
        )
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(index);
