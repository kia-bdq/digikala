
import { BrowserRouter as Router , Switch, Route } from 'react-router-dom';
import ProductDetails from './components/productDetails/ProductDetails';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/product/:id'>
              <ProductDetails />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
