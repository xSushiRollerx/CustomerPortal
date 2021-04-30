import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import UserPortal from "./components/UserPortal";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

function App() {
  return (
    <Router>
      <HeaderComponent/>
      <div className="container">
          <Switch>
              <Route path = "/" exact component = {UserPortal}></Route>
          </Switch>
      </div>
      <FooterComponent/>
  </Router>
  );
}

export default App;
