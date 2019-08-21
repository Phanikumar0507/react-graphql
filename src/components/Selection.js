import React from "react";
import {Query} from "urql";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const query = `query {getMetrics}`;

const animatedComponents = makeAnimated();

export default props => {

    const {selectedMetrics} = props;

    return (
        <Query query={query}>
            {({fetching, data, error}) => {
                if (fetching) {
                    return "Loading...";
                } else if (error) {
                    return "Oh no!";
                } else if (!data) {
                    return "No data";
                }
                const metrics = data.getMetrics.map(metric => ({
                    value: metric,
                    label: metric
                }));

                return (
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        defaultOptions="loading"
                        options={metrics}
                        onChange={selectedMetrics}
                    />
                );
            }}
        </Query>
    );
};
