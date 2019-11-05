import { Component, HostBinding, Input, Output, EventEmitter, HostListener, ElementRef, OnInit } from '@angular/core';
import { Board, Box, LineName, Line } from '../../shared/model';
import { DomSanitizer } from '@angular/platform-browser';
import * as boardService from '../../shared/board.service';

interface LineItem extends Line {
  class: string;
  name: LineName;
}

@Component({
  selector: 'dab-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @HostBinding('class.current-player1') get currentPlayer1Class(): boolean {
    return this.player0Turn;
  }

  @HostBinding('class.current-player2') get currentPlayer2Class(): boolean {
    return this.player1Turn;
  }

  @HostBinding('class.inactive') get notMyTurnClass() {
    return !this.design && this.disabled;
  }

  @Input() board: Board;

  @HostBinding('class.design') @Input() design: boolean;
  @Input() disabled = false;
  @Input() player0Turn = false;
  @Input() player1Turn = false;

  @Output() clickLine = new EventEmitter<{ row: number, box: number, line: LineName }>();
  @Output() clickBox = new EventEmitter<Box>();

  constructor(private sanitizer: DomSanitizer, private elRef: ElementRef) {
  }

  ngOnInit() {
    this.updateBoxSize();
  }

  lines(box: Box): LineItem[] {
    return [
      { name: 't', class: 'top', ...box.t },
      { name: 'l', class: 'left', ...box.l },
      { name: 'b', class: 'bottom', ...box.b },
      { name: 'r', class: 'right', ...box.r }
    ];
  }

  onClickLine(row: number, box: number, line: LineName, e: MouseEvent) {
    if (this.disabled) {
      return;
    }
    this.clickLine.emit({ row, box, line });
    e.cancelBubble = true;
  }

  onClickBox(box: Box) {
    if (this.disabled) {
      return;
    }
    this.clickBox.emit(box);
  }

  boundaryOwner(box: Box): boolean {
    return boardService.isBoundaryOwner(box);
  }

  @HostListener('window:resize') updateBoxSize() {
    const { board } = this;
    if (!board) {
      return;
    }
    const { innerWidth, innerHeight } = window;
    const innerSize = Math.min(innerWidth, innerHeight);
    const boxSize = Math.floor((innerSize - 40) / board.length);
    const boxLineSize = boxSize < 70 ? 8 : 12;
    const style = this.elRef.nativeElement.style;
    style.setProperty(`--box-size`, `${boxSize}px`);
    style.setProperty(`--box-line-size`, `${boxLineSize}px`);
  }
}
