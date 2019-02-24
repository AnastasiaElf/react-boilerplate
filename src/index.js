import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.container';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk'
import { rootEpic, rootReducer } from './reducers/index';
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { changeLanguage, getDefaultLanguage } from "./reducers/common/localization";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const epicMiddleware = createEpicMiddleware();

let store = createStore(rootReducer, applyMiddleware(thunk, epicMiddleware));

epicMiddleware.run(rootEpic);

store.dispatch(changeLanguage(getDefaultLanguage()));

let WidgetContainer = withRouter(App);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <WidgetContainer />
        </Router>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
