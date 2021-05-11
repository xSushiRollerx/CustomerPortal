import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CustomerPortal from "./components/CustomerPortal";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import sushi from "./images/sushi.jpg";


function App() {
  return (
  <div>
    <HeaderComponent/>
    <div style={{ 
        // backgroundImage: `url(${sushi})`,
        backgroundSize: "cover",
        height: "100vh",
       }}>
      <Router>
        <div className="container">
            <Switch>
                <Route path = "/*" exact component = {CustomerPortal}></Route>
            </Switch>
        </div>
      </Router>
    </div>
    
    <FooterComponent/>
  </div>
  );
}

export default App;
