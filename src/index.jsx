import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import configureStore, {history} from './store/configureStore';
import Root from './scenes/components/Root/index.jsx';

const store = configureStore();

render(
    <AppContainer>
        <Root store={store} history={history}/>
    </AppContainer>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept('./scenes/components/Root/index.jsx', () => {
        const NewRoot = require('./scenes/components/Root/index.jsx').default;
        render(
            <AppContainer>
                <NewRoot store={store} history={history}/>
            </AppContainer>,
            document.getElementById('app')
        );
    });
}
