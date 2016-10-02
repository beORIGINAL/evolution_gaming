import {default as React, Component} from 'react';
import './participants.scss';
export default class Participants extends React.Component {
    constructor (props) {
        super(props);
        
    }
    
    render () {
        return(
            <div className="participants">
                {
                    [...Array(this.props.max).keys()].map((item, idx) => {
                        const cssClass = `participant glyphicon glyphicon-user ${idx < this.props.amount && 'active'}`;
                        return <i className={cssClass}></i>;
                    })
                }
            </div>);
    }
}

Participants.propTypes = {
    amount: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired
};
