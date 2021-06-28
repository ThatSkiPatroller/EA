import React from "react";
import { AuthContext } from './Context/AuthContext';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Home from './Components/Home';
import Todos from './Components/Todos';
import Register from './Components/Register';
import Admin from './Components/Admin';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import PrivateRoute from './hocs/PrivateRoute';
import { BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path='/' component={Home} />
      <UnPrivateRoute path='/login' component={Login} />
      <UnPrivateRoute path='/register' component={Register} />
      <PrivateRoute path='/todos' roles={['user', 'admin']} component={Todos} />
      <PrivateRoute path='/admin' roles={['admin']} component={Admin} />
    </Router>
  );
}

export default App;
