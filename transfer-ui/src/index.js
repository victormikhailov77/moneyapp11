import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Keycloak from "keycloak-js";


ReactDOM.render(<App/>, document.getElementById('root'));

//keycloak init options
let initOptions = {
    url: 'http://localhost:8080/auth', realm: 'dev', clientId: 'transfer-ui', onLoad: 'login-required'
}


let keycloak = Keycloak(initOptions);

keycloak.init({onLoad: initOptions.onLoad}).success((auth) => {

    if (!auth) {
        window.location.reload();
    } else {
        console.info("Authenticated");
    }

    //React Render
    ReactDOM.render(<App/>, document.getElementById('root'));

    localStorage.setItem("react-token", keycloak.token);
    localStorage.setItem("react-refresh-token", keycloak.refreshToken);

    setTimeout(() => {
        keycloak.updateToken(70).success((refreshed) => {
            if (refreshed) {
                console.debug('Token refreshed' + refreshed);
            } else {
                console.warn('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).error(() => {
            console.error('Failed to refresh token');
        });


    }, 60000)

}).error(() => {
    console.error("Authenticated Failed");
});

serviceWorker.unregister();
