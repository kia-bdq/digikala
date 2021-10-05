import './App.css';
import { BrowserRouter as Router , Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import ProductDetails from './components/productDetails/ProductDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/product/:id'>
                <ProductDetails />
              </Route>
            
  {/*<Route component={PageNotFound} />*/}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
