import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ConnectedRouter} from 'connected-react-router';
import {Provider} from 'react-redux';
import Landing from "../../index.jsx";
import Dashboard from "../../dashboard.jsx";
import {Switch, Route, Redirect} from 'react-router-dom'


export default class Root extends Component {
    render() {
        const {store, history} = this.props;
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Redirect to="/"/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
