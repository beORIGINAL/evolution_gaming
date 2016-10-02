import {default as React, Component} from 'react';
import {render} from 'react-dom';

class App extends React.Component {
    render () {
        return (<h1>Your code should be here...</h1>);
    }
}

render(<App/>, document.getElementById('app-view'));
