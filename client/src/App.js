import React, { Component } from "react"
import { Provider } from "react-redux"
import { Switch, Route } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import "./App.scss"
import store, { persistor } from "./state/store"
import CustomersPage from "./views/pages/customers/CustomersPage"
import SalesPage from "./views/pages/sales/SalesPage"
import LoginPage from "./views/pages/login/LoginPage"
import ModelPage from "./views/pages/models/ModelPage"
import LocationPage from "./views/pages/locations/LocationPage"
import SupplierPage from "./views/pages/suppliers/SupplierPage"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <Switch>
              <Route path='/login' render={props => <LoginPage {...props}/>} />
              <Route path='/customers' render={props => <CustomersPage {...props}/>} />
              <Route exact path={['/', '/sales']} render={props => <SalesPage {...props}/>} />
              <Route path='/models' render={props => <ModelPage {...props}/>} />
              <Route path='/locations' render={props => <LocationPage {...props} />} />
              <Route path='/suppliers' render={props => <SupplierPage {...props} />} />
            </Switch>
          </div>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
