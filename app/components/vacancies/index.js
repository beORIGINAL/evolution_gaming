import {default as React, Component} from 'react';
import VacancyTable from '../vacancy-table';
import './vacancies.scss';

let socket = {};
let events = {};

export default class Vacancies extends React.Component{
    constructor (props) {
        super(props);
        socket = this.props.activeConnection;
        events = this.props.config.eventType.crud;
        this.subscribe();
        
        this.state = {
            vacanciesTables: [],
            dataCopy: []
        };
    }
    
    subscribe () {
        socket.send({ $type: events.subscribe });
        socket.on(events.getList, this.getVacanciesList.bind(this));
        socket.on(events.add.success, this.onVacancyAdd.bind(this));
        
        socket.on(events.update.success, this.onOperationSuccess.bind(this));
        socket.on(events.remove.success, this.onOperationSuccess.bind(this));
    
        socket.on(events.update.failure, this.onOperationFailed.bind(this));
        socket.on(events.remove.failure, this.onOperationFailed.bind(this));
    }
    
    getVacanciesList (data) {
        this.setState({ vacanciesTables: data.tables });
    }
    
    onVacancyAdd (data) {
        const afterIdIndex = this.state.vacanciesTables.findIndex(table => table.id === data.after_id);
        const tablesAfterUpdate = [...this.state.vacanciesTables];
        tablesAfterUpdate.splice(afterIdIndex + 1, 0, data.table);
        this.setState({ vacanciesTables: tablesAfterUpdate, dataCopy: tablesAfterUpdate });
        console.info(`${JSON.stringify(data.table)} added after ${JSON.stringify(this.state.vacanciesTables[afterIdIndex])};`);
    }
    
    onOperationSuccess (data) {
        this.setState({ dataCopy: [ ...this.state.vacanciesTables ] });
        console.info(`Item with id:${data.id || data.table.id} was ${data.$type.replace('table_', '')}`);
    }
    
    onOperationFailed (data) {
        console.info(`${data.$type.replace('_', ' ')} of entity with id:${data.id}`);
        this.setState({ dataCopy:[], vacanciesTables: this.state.dataCopy });
    }
    
    vacancyRemove (id) {
        const dataCopy = [ ...this.state.vacanciesTables ];
        const vacanciesTables = [ ...this.state.vacanciesTables ];
        vacanciesTables.splice(vacanciesTables.findIndex(table => table.id === id), 1);
        socket.send({ $type: events.remove.base, id });
        this.setState({ dataCopy, vacanciesTables });
    }
    
    vacancyUpdate (modifiedTable) {
        const dataCopy = [ ...this.state.vacanciesTables ];
        const vacanciesTables = [ ...this.state.vacanciesTables ];
        const tableIndex = vacanciesTables.findIndex(table => table.id === modifiedTable.id);
        vacanciesTables[tableIndex] = modifiedTable;
        socket.send({ $type: events.update.base, table: modifiedTable });
        this.setState({ dataCopy, vacanciesTables });
    }
    
    render () {
        return(
            <section className="vacancies container">
                {
                    this.state.vacanciesTables.map((vacancy) =>
                        <VacancyTable data={vacancy}
                                      participantsMaxAmount={this.props.config.participantsMaxAmount}
                                      onRemove={this.vacancyRemove.bind(this)}
                                      onUpdate={this.vacancyUpdate.bind(this)}
                        />)
                }
            </section>);
    }
}

Vacancies.propTypes = {
    activeConnection: React.PropTypes.object.isRequired,
    config: React.PropTypes.object.isRequired
};
