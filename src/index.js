import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.jquery = window.jQuery = window.$ = require('jquery')


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
