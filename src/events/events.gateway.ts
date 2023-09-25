import { Profile } from 'passport-google-oauth20';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  socket: Socket;

  @SubscribeMessage('failedLogin')
  handleFailedLogin(): void {
    this.server.emit('validation', { success: false, message: 'Email not found' });
  }

  @SubscribeMessage('successLogin')
  handleSuccessLogin(): void {
    this.server.emit('validation', { success: true, message: 'Login successful' });
  }

  handleRegister(Profile): void {
    this.server.emit('profileData', Profile);
  }
}