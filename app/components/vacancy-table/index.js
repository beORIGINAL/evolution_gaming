import {default as React, Component} from 'react';
import './vacancy-table.scss';
import Participants from '../participants';

export default class VacancyTable extends React.Component{
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <figure className={`vacancy ${this.props.data.id}`}>
                <figcaption>
                    <h2>{this.props.data.name}</h2>
                    <button className="btn btn-danger"
                            onClick={this.props.onRemove.bind(this, this.props.data.id)}>
                        <i className="glyphicon glyphicon-remove"></i>
                    </button>
                </figcaption>
                <Participants amount={this.props.data.participants}
                              max={this.props.participantsMaxAmount}/>
            </figure>);
    }
}

VacancyTable.propTypes = {
    data: React.PropTypes.object.isRequired,
    participantsMaxAmount: React.PropTypes.number.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    onUpdate: React.PropTypes.func.isRequired
};
