import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { Board, Box, LineName, Line } from '@shared/model';
import { DomSanitizer } from '@angular/platform-browser';
import * as boardService from '@shared/board.service';

interface LineItem extends Line {
  class: string;
  name: LineName;
}

@Component({
  selector: 'dab-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  @HostBinding('class.current-player1') get currentPlayer1Class(): boolean {
    return this.player0Turn;
  }

  @HostBinding('class.current-player2') get currentPlayer2Class(): boolean {
    return this.player1Turn;
  }

  @HostBinding('class.inactive') get notMyTurnClass() {
    return !this.design && this.disabled;
  }

  @HostBinding('attr.style') get styleAttr() {
    // const boxSize = 50;
    // const boxLineSize = 8;
    const boxSize = 80;
    const boxLineSize = 12;
    // const boxSize = 150;
    // const boxLineSize = 16;
    return this.sanitizer.bypassSecurityTrustStyle(`--box-size: ${boxSize}px; --box-line-size: ${boxLineSize}px;`);
  }

  @Input() board: Board;

  @HostBinding('class.design') @Input() design: boolean;
  @Input() disabled = false;
  @Input() player0Turn = false;
  @Input() player1Turn = false;

  @Output() clickLine = new EventEmitter<{ row: number, box: number, line: LineName }>();

  constructor(private sanitizer: DomSanitizer) {
  }

  lines(box: Box): LineItem[] {
    return [
      { name: 't', class: 'top', ...box.t },
      { name: 'l', class: 'left', ...box.l },
      { name: 'b', class: 'bottom', ...box.b },
      { name: 'r', class: 'right', ...box.r }
    ];
  }

  onClickLine(row: number, box: number, line: LineName) {
    if (this.disabled) {
      return;
    }
    this.clickLine.emit({ row, box, line });
  }

  boundaryOwner(box: Box): boolean {
    return boardService.isBoundaryOwner(box);
  }
}
