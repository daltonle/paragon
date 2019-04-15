import React, { Component } from "react"
import { Provider } from "react-redux"
import { Switch, Route } from "react-router-dom"
import "./App.scss"
import store from "./state/store"
import CustomersPage from "./views/pages/customers/CustomersPage";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route path='/customers' component={CustomersPage} />
          </Switch>
        </div>
      </Provider>
    )
  }
}

export default App
