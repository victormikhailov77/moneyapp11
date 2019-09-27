import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListTransferComponent from "./transfer/ListTransfersComponent";
import CreateTransferComponent from "./transfer/CreateTransferComponent";
import React from "react";

const AppRouter = () => {
    return (
        <div style={style}>
            <Router>
                <Switch>
                    <Route path="/" exact component={ListTransferComponent}/>
                    <Route path="/transfers" component={ListTransferComponent}/>
                    <Route path="/create-transfer" component={CreateTransferComponent}/>
                </Switch>
            </Router>
        </div>
    )
}

const style = {
    marginTop: '20px',
    justifyContent: 'left'
}

export default AppRouter;