import {Component} from '@angular/core';
import {Message} from "@nx-example/models";
import {MessagesService} from "./messages.service";
import {map} from "rxjs/operators";
import { Observable } from 'rxjs';

@Component({
  selector: 'nx-example-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-app';
  messages$: Observable<Message[]>;
  currentMessage = '';
  user = 'anonymous' + new Date().getTime();
  color = '#333333';

  constructor(private messagesService: MessagesService) {
    this.messages$ = this.messagesService
      .getMessages()
      .pipe(map(messages => messages.reverse()));
  }

  sendMessage() {
    this.messagesService.addMessage({
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
}
