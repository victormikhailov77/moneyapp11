import React, { Fragment } from 'react';
import './App.css';

import AppRouter from "./component/RouterComponent";
import NavBar from "./component/Navbar";
import Container from '@material-ui/core/Container';

function App() {
    return (
        <Fragment>
            <NavBar/>
            <AppRouter/>
        </Fragment>
    );
}

export default App;


