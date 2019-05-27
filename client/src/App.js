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
import UserPage from "./views/pages/users/UserPage"
import CataloguePage from "./views/pages/catalogues/CataloguePage"
import OrderPage from "./views/pages/orders/OrderPage"
import ErrorPage from "./views/pages/errors/ErrorPage"
import ProfilePage from "./views/pages/users/ProfilePage"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <Switch>
              <Route exact path={['/', '/sales']} render={props => <SalesPage {...props}/>} />
              <Route path='/login' render={props => <LoginPage {...props}/>} />
              <Route path='/customers' render={props => <CustomersPage {...props}/>} />
              <Route path='/models' render={props => <ModelPage {...props}/>} />
              <Route path='/locations' render={props => <LocationPage {...props} />} />
              <Route path='/suppliers' render={props => <SupplierPage {...props} />} />
              <Route path='/staff' render={props => <UserPage {...props} />} />
              <Route path='/catalogues' render={props => <CataloguePage {...props} />} />
              <Route path='/stock-order' render={props => <OrderPage {...props} />} />
              <Route path='/profile' render={props => <ProfilePage {...props} />} />
              <Route render={props => <ErrorPage {...props}/>} />
            </Switch>
          </div>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
