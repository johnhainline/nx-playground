import { Observable } from 'rxjs';
import { Message } from '@nx-example/models';
import { Socket } from 'ngx-socket-io';

export class MessagesService {
  constructor(private socket: Socket) {}

  addMessage(message: Message): void {
    this.socket.emit('messageToServer', message);
  }

  getMessages(): Observable<Message[]> {
    return this.socket.fromEvent<Message[]>('messageToClient');
  }
}
