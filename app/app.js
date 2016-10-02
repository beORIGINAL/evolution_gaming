import './app.scss';
import {default as React, Component} from 'react';
import WebSocketProvider from './shared/websocket.provider';
import config from './configs/connection.config.json';//eslint-disable-line
import Vacancies from './components/vacancies';
const socket = new WebSocketProvider(config.host);

export default class App extends React.Component {
    constructor (props){
        super(props);
        socket.connect({ $type: config.eventType.serverRespond.ping, seq: 1 });
        socket.on(config.eventType.serverRespond.pong, this.authorizationHandler.bind(this));
        this.state = {
            userType: null,
            authorized: false
        };
    }
    
    authorizationHandler () {
        console.info ('Connection opened...');
        socket.on(config.eventType.auth.success, this.authorizationPassed.bind(this));
        socket.on(config.eventType.auth.failure, this.authorizationFailed.bind(this));
        socket.on(config.eventType.auth.notAuthorized, this.authorizationFailed.bind(this));
        socket.send({
            $type: config.eventType.auth.base,
            username: config.credentials.username,
            password: config.credentials.password
        });
    }
    
    authorizationPassed (data) {
        console.info(`You have been successfully signed in as ${data.user_type}`);
        this.setState({
            userType: data.user_type,
            authorized: true
        });
    }
    
    authorizationFailed (data) {
        console.info(`Password or username are incorrect. Try again later...`);
    }
    
    render () {
        if (this.state.authorized) {
            return <Vacancies activeConnection={socket} config={config}/>;
        }
        return (
            <h1 className="not-authorized">
                Sorry, you are not Authorized...
            </h1>);
    }
}
