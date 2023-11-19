import { Switch } from "react-router-dom/cjs/react-router-dom.min";

import { Route } from "react-router-dom/cjs/react-router-dom";
import DashBoard from "./Base/DashBoard";
import Login from "./Components/Register/Login";
import SignIn from "./Components/Register/SignIn";
import Bookmarked from "./Components/Saved/Bookmarked.js"
import Users from "./Components/Users/Users.js"
function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/SignIn">
        <SignIn />
      </Route>
      <Route path="/DashBoard">
        <DashBoard />
      </Route>
        <Route path="/Users">
          <Users />
        </Route>
        <Route path="/Bookmarked">
          <Bookmarked />
        </Route>
       
      </Switch>
    </div>
  );
}

export default App;
