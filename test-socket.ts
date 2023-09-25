import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3002');

socket.on('connect', () => {
  console.log('Connected to Socket.IO server');
  // You can perform additional actions or emit events here
});

socket.on('disconnect', () => {
  console.log('Disconnected from Socket.IO server');
});