import openSocket from 'socket.io-client';

const socket = openSocket('ws://3.142.213.201:3000');

function webSocketSubscription(cb) {
    socket.on('data', (data) => {
        // console.log(data);
        cb(data)
    })
}

export {webSocketSubscription}
