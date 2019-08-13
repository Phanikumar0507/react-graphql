// This file configures a web server for testing the production build
// on your local machine.

import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import {chalkProcessing} from './chalkConfig';
import Define from './config/index';
/* eslint-disable no-console */

console.log(chalkProcessing('Opening production build...'));

// Run Browsersync
browserSync({
    port: Define.APP_PORT,
    notify: false,
    ui: {
        port: 4001
    },
    server: {
        baseDir: 'dist'
    },

    files: [
        'src/*.html'
    ],

    middleware: [historyApiFallback()]
});
