import "./App.css"
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store/index"
import Home from "page/home/Home"
import Login from "page/users/Login"
import NotFound from "page/notFound/NotFound"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/home" exact></Redirect>
          <Route path="/home" component={Home}></Route>
          <Route path="/login"  component={Login}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
