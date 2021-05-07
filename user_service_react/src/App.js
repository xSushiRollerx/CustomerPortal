import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CustomerPortal from "./components/CustomerPortal";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

function App() {
  return (
    <Router>
      <HeaderComponent/>
      <div className="container">
          <Switch>
              <Route path = "/*" exact component = {CustomerPortal}></Route>
          </Switch>
      </div>
      <FooterComponent/>
  </Router>
  );
}

export default App;
