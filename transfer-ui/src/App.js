import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListTransfersComponent from "./component/transfer/ListTransfersComponent";
import CreateTransferComponent from "./component/transfer/CreateTransferComponent";

function App() {
  return (
      <div className="container">
        <Router>
          <div className="col-md-6">
            <h1 className="text-center" style={style}>React User Application</h1>
            <Switch>
              <Route path="/" exact component={ListTransfersComponent} />
              <Route path="/transfers" component={ListTransfersComponent} />
              <Route path="/create-user" component={CreateTransferComponent} />
            </Switch>
          </div>
        </Router>
      </div>
  );
}

const style = {
  color: 'red',
  margin: '10px'
}

export default App;

