import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { PersistGate } from 'redux-persist/integration/react';
import {persistor} from './store/index';
import { BrowserRouter , Route,Switch } from 'react-router-dom';

import AdminDashhboard from './Pages/dashboard'
import bodega from './Pages/bodega';
import Logout from './Pages/Logout';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <header className="App-header">
              <BrowserRouter>                
                <Switch>
                  <Route exact path="/" component={Login} />                  
                  <Route path="/login" component={Login} />
                  <Route path="/dashboard" component={AdminDashhboard} />              
                  <Route path="/bodega" component={bodega} />
                  <Route path="/logout" component={Logout} />
                  <Route path='*' exact={true} component={NotFound} />
                </Switch>               
              </BrowserRouter>   
          </header>
          </div>             
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
