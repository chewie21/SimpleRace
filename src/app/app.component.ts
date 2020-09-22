import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {GameAreaComponent} from './game-area/game-area.component';
import {animate, group, keyframes, state, style, transition, trigger, useAnimation} from '@angular/animations';
import {slideInDown, slideInLeft, slideInUp, slideOutDown, slideOutLeft, slideOutUp} from 'ng-animate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('score', [
      state('none', style({
        opacity: '0'
      })),
      state('block', style({
        opacity: '1'
      })),
      transition( 'none => block', group([
        animate('1s', keyframes([
          style({opacity: '0.1', offset: 0}),
          style({opacity: '0.5', offset: 0.5}),
          style({opacity: '1', offset: 1}),
        ])),
        useAnimation(slideInUp)
      ])),
      transition('block => none', group([
        animate('1s', keyframes([
          style({opacity: '1', offset: 0}),
          style({opacity: '0.5', offset: 0.5}),
          style({opacity: '0.1', offset: 1}),
        ])),
        useAnimation(slideOutDown)
      ])),
    ]),
    trigger('bestScore', [
      state('none', style({
        opacity: '0'
      })),
      state('block', style({
        opacity: '1'
      })),
      transition( 'none => block', group([
        animate('1s', keyframes([
          style({opacity: '0.1', offset: 0}),
          style({opacity: '0.5', offset: 0.5}),
          style({opacity: '1', offset: 1}),
        ])),
        useAnimation(slideInUp)
      ])),
      transition('block => none', group([
        animate('1s', keyframes([
          style({opacity: '1', offset: 0}),
          style({opacity: '0.5', offset: 0.5}),
          style({opacity: '0.1', offset: 1}),
        ])),
        useAnimation(slideOutDown)
      ])),
    ]),
    trigger('button', [
      state('none', style({
        opacity: 0,
        display: 'none',
      })),
      state('block', style({
        opacity: 1,
        display: 'inline-block'
      })),
      transition('block => none', group([
        animate('1s', keyframes([
          style({opacity: 1, offset: 0}),
          style({opacity: 0.5, offset: 0.5}),
          style({opacity: 0,  offset: 1}),
        ])),
        useAnimation(slideOutLeft)
      ])),
      transition('none => block', group([
        animate('1s', keyframes([
          style({opacity: 0.1, display: 'inline-block', offset: 0}),
          style({opacity: 0.5, offset: 0.5}),
          style({opacity: 1, offset: 1}),
        ])),
        useAnimation(slideInLeft)
      ]))
    ])
  ]
})
export class AppComponent implements AfterViewInit{

  @ViewChild(GameAreaComponent) gameArea: GameAreaComponent;
  //Вывод счета
  score: number;
  bestScore: number;
  setScore (score) {
    this.score = score;
  }
  setBestScore (score) {
    this.bestScore = score;
  }

  //Анимации
  stateScore = 'none';
  stateBestScore = 'none';
  stateButton = 'block'
  vieButton (button) {
    if(button) {
      this.stateButton = 'block'
    } else {
      this.stateButton = 'none'
    }
  }
  vieBestScore (score) {
    if(score) this.stateBestScore = 'block'
  }
  vieScore (score) {
    if(score) {
      this.stateScore = 'block';
    } else {
      this.stateScore = 'none';
    }
  }

  ngAfterViewInit() {

  }

  //Запуск игры
  start() {
    this.gameArea.runApplication();

  }
}
