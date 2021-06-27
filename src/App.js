import React from "react";
import { AuthContext } from './Context/AuthContext';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Home from './Components/Home';
import { BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  
  return (
    <Router>
      <Navbar />
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
    </Router>
  );
}

export default App;
