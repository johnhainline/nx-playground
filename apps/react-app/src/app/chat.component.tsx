import React, {ComponentProps} from 'react'
import {Message} from "@nx-example/models";
import {MessagesService} from "./messages.service";
import {Socket, SocketIoConfig} from "ngx-socket-io";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

class ChatComponent extends React.Component {
  config: SocketIoConfig = {
    url: ':4001',
    options: {}
  };

  service = new MessagesService(new Socket(this.config));
  currentMessage = '';
  user = 'anonymous' + new Date().getTime();
  color = '#224466';

  messages$ = this.service.getMessages()
    .pipe(map(messages => messages.reverse()));

  sendMessage() {
    this.service.addMessage({
      message: this.currentMessage,
      user: this.user,
      color: this.color,
      creationDate: new Date().toISOString()
    });
    this.currentMessage = '';
  }

  trackByFn(index, item: Message) {
    return item.creationDate.toString();
  }

  render() {
    return (
      <div>
          <input type="text" placeholder={'Enter message...'}
                 value={this.state.message}
                 onChange={e => this.setState({message: e.target.value})}/>
          <input type="submit" value={'Send'}/>
        {
          this.messages$.map((message, index) =>
            <p><strong>{message.name}</strong> <emph>{message.message}</emph></p>
        )}
      </div>
    )
  }
}

export default ChatComponent
