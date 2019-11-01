import { Component } from '@angular/core';
import { ChatMessage } from '@shared/model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'dab-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  text: string;

  constructor(public gameService: GameService) { }

  get messages(): ChatMessage[] {
    return this.gameService.chatMessages;
  }

  send() {
    const { text } = this;
    if (text) {
      this.gameService.chat(this.text);
    }
  }
}
