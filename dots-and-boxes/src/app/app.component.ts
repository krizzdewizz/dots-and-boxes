import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'dab-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.init();
  }
}
