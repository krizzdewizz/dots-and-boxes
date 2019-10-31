import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { Board, Box } from '@shared/model';
import { DomSanitizer } from '@angular/platform-browser';
import * as boardService from '@shared/board.service';

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

  @Output() clickLine = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) {
  }

  lines(box: Box) {
    return [
      { name: 'top', ...box.top },
      { name: 'left', ...box.left },
      { name: 'bottom', ...box.bottom },
      { name: 'right', ...box.right }
    ];
  }

  onClickLine(row: number, box: number, line: string) {
    if (this.disabled) {
      return;
    }
    this.clickLine.emit({ row, box, line });
  }

  boundaryOwner(box: Box): boolean {
    return boardService.isBoundaryOwner(box);
  }
}
