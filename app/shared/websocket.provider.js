let socket = {};

export default class WebSocketProvider {
    constructor (host) {
        if (!host) {
            throw new Error('No host provided for new WebSocket connection.');
        }
        this.events = {};
        socket = Object.freeze(new WebSocket(host));
        socket.onmessage = this.messagesHandler.bind(this);
        socket.onclose = this.handleConnectionClose.bind(this);
        socket.onerror = this.handleError.bind(this);
    }
    
    connect (data) {
        socket.onopen = () =>
            socket.send(JSON.stringify(data));
    }
    
    send (data) {
        data = JSON.stringify(data);
        console.info(`You are trying to send ${data}`);
        socket.send(data);
    }
    
    on (type, handler) {
        this.events[type] = handler;
    }
    
    messagesHandler ($event) {
        const retrivedData = JSON.parse($event.data);
        if (retrivedData && retrivedData.$type && retrivedData.$type in this.events) {
            this.events[retrivedData.$type](retrivedData);
        } else {
            console.info('Unhandled event type and response data:', event, retrivedData);
        }
    }
    
    handleError (error) {
        console.error(error);
    }
    
    handleConnectionClose () {
        console.info('Previous connection closed...');
    }
}
