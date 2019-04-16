import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/sb-admin.css';
import './css/sb-admin.min.css';
import './css/style.css';
import './index.css';
import './vendor/fontawesome-free/css/all.min.css'
import './vendor/datatables/dataTables.bootstrap4.css'
// import './assets/vendor/datatables/jquery.dataTables.js'
// import './assets/vendor/datatables/dataTables.bootstrap4.js'
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();