import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Reducer from './Components/Reducer/Reducer';

import Login from './Views/Login/Login';
import Dashboard from './Views/Dashboard/Dashboard';




import registerServiceWorker from './registerServiceWorker';

const store = createStore(Reducer);


ReactDOM.render((
    <Provider store={store}>
    <BrowserRouter>

  
          <Route path = "/" component={Dashboard}/>

    </BrowserRouter>
    </Provider>
  ), document.getElementById('root'));

registerServiceWorker();



