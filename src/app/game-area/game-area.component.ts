import {
  Component,
  ElementRef, EventEmitter,
  HostListener, Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {animate, group, keyframes, state, style, transition, trigger, useAnimation} from '@angular/animations';
import {
  bounce,
  fadeIn, fadeOut, jello,
  rotateIn,
  rotateInDownLeft, rotateOut,
  slideInDown,
  slideInLeft,
  slideInRight,
  slideInUp, slideOutDown, slideOutLeft, slideOutRight,
  slideOutUp, wobble,
  zoomIn
} from 'ng-animate';

@Component({
  selector: 'app-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('car', [
      state('none', style({
        opacity: '0',
        bottom: '-100px',
        top: 'auto',
        left: '175px',
      })),
      state('block', style({
        opacity: '1',
        bottom: `10px`
      })),
      transition('block => none', animate('2s', keyframes([
        style({opacity: '1', offset: 0}),
        style({opacity: '0', offset: 0.2}),
        style({opacity: '1', offset: 0.4}),
        style({opacity: '0', offset: 0.6}),
        style({opacity: '1', offset: 0.8}),
        style({opacity: '0', offset: 1}),
      ]))),
      transition( 'none => block', group([
        animate('1s', keyframes([
          style({opacity: '0', offset: 0}),
          style({opacity: '0.1', offset: 0.5}),
          style({opacity: '0.8', offset: 0.8}),
          style({opacity: '0.9', offset: 0.9}),
          style({opacity: '1', offset: 1}),
        ])),
        animate('1s', keyframes( [
          style({bottom: '-99px', offset: 0}),
          style({bottom: '-30px', offset: 0.3}),
          style({bottom: '-5px', offset: 0.5}),
          style({bottom: '0px', offset: 0.8}),
          style({bottom: '5px', offset: 0.9}),
          style({bottom: '10px', offset: 1}),
        ]))
      ]))
    ]),
    trigger('topTunnel', [
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
        useAnimation(slideOutUp)
      ]))
    ]),
    trigger('downTunnel', [
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
        useAnimation(slideInDown)
      ])),
      transition( 'block => none', group([
        animate('1s', keyframes([
          style({opacity: '1', offset: 0}),
          style({opacity: '0.5', offset: 0.5}),
          style({opacity: '0.1', offset: 1}),
        ])),
        useAnimation(slideOutDown)
      ]))
    ]),
    trigger('leftRoadside', [
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
        useAnimation(slideInLeft)
      ])),
      transition( 'block => none', group([
        animate('1s', keyframes([
          style({opacity: '1', offset: 0}),
          style({opacity: '0.5', offset: 0.5}),
          style({opacity: '0.1', offset: 1}),
        ])),
        useAnimation(slideOutLeft)
      ]))
    ]),
    trigger('rightRoadside', [
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
        useAnimation(slideInRight)
      ])),
      transition( 'block => none', group([
        animate('1s', keyframes([
          style({opacity: '1', offset: 0}),
          style({opacity: '0.5', offset: 0.5}),
          style({opacity: '0.1', offset: 1}),
        ])),
        useAnimation(slideOutRight)
      ]))
    ]),
    trigger('gameArea', [
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
        useAnimation(fadeIn)
      ])),
      transition( 'block => none', group([
        animate('1s', keyframes([
          style({opacity: '1', offset: 0}),
          style({opacity: '0.5', offset: 0.5}),
          style({opacity: '0.1', offset: 1}),
        ])),
        useAnimation(fadeOut)
      ]))
    ]),
  ]
})
export class GameAreaComponent {
  //Выводим данные родителю
  @Output() score: EventEmitter<number> = new EventEmitter<number>();
  @Output() bestScore: EventEmitter<number> = new EventEmitter<number>();
  @Output() vieScore: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() vieBestScore: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() vieButton: EventEmitter<boolean> = new EventEmitter<boolean>();
  //Работа с HTML
  @ViewChild(`gameArea`) gameArea: ElementRef;
  @ViewChild(`game`) game: ElementRef;
  @ViewChild(`userCar`) car: ElementRef;

  //Отслеживание нажатия кнопок и их запись в объект
  @HostListener(`document:keydown`, ['$event']) keyDown(event) {
    event.preventDefault();
    this.keys[event.key] = true;
  };
  @HostListener(`document:keyup`, ['$event']) keyUp(event) {
    event.preventDefault();
    this.keys[event.key] = false;
  };
  keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
  }

  //Для анимации
  stateTopTunnel: string = 'none';
  stateDownTunnel: string = 'none';
  stateLeftRoadside: string = 'none';
  stateRightRoadside: string = 'none';
  stateGameArea: string = 'none';
  stateCar: string = 'none';
  stateEnemy = 'block';

  //Расположение игровой машины на экране
  carLocation = {
    x: null, y: null
  }

  //Настройки игры
  //Проверяем localStorage
  getData() {
    if(!localStorage.getItem('race')) {
      localStorage.setItem('race', '0');
    }
    return JSON.parse(localStorage.getItem('race'));
  }
  gameSettings = {
    start: false,
    speed: 5, //скорость машины
    traffic: 3, //сложность трафика: 1 - не проходимо
    score: 0,
    bestScore: 0
  };

  //Запуск "приложения"
  runApplication () {
    //Показываем игровое поле
    this.game.nativeElement.style.display = 'block';
    //Скрываем кнопку
    this.vieButton.emit(false);
    //Запускаем анимации
    this.stateTopTunnel = 'block';
    this.stateDownTunnel = 'block';
    this.stateLeftRoadside = 'block';
    this.stateRightRoadside = 'block';
    this.stateGameArea = 'block';
    setTimeout(() => this.stateCar = 'block', 1500);

    //Рисуем разметку и врагов
    this.roadLine();
    this.enemy();

    //Разбираемся с очками
    this.gameSettings.score = 0;

    //Получаем рекорд
    this.gameSettings.bestScore = this.getData();

    //Отправляем в главный компонент
    this.score.emit(this.gameSettings.score);
    this.vieScore.emit(true);
    if(this.gameSettings.bestScore) {
      this.bestScore.emit(this.gameSettings.bestScore);
      this.vieBestScore.emit(true);
    }

    //Запускаем игру
    this.gameSettings.start = true;
    setTimeout(() => this.gameProcess(), 2500);
  }

  //Вычисление элементов на странице
  gameQuantityElementElements(heightElement) {
    return this.gameArea.nativeElement.clientHeight / heightElement;
  }

  //Разметка
  roadLineLocation: number = 0;
  roadLine() {
    for (let i = 0; i <= this.gameQuantityElementElements(75); i++) {
      const line = document.createElement(`div`);
      line.classList.add('line');
      line.style.top = (i * 75) + 'px';
      this.gameArea.nativeElement.append(line);
    }
  };
  moveRoadLine () {
    document.querySelectorAll('.line').forEach((item, index) => {
      (item as HTMLElement).style.top = index * 75 + this.roadLineLocation + 'px';
      if(index * 75 + this.roadLineLocation >= document.querySelector('.gameArea').clientHeight) {
        this.roadLineLocation = -75;
      }
    });
  };

  //Враги
  enemy() {
    for (let i = 0; i <= this.gameQuantityElementElements(100 * this.gameSettings.traffic); i++) {
      const enemy = document.createElement('div');
      enemy.classList.add('enemy');
      let counter = Math.floor(Math.random() * Math.floor(3));
      if(counter === 0) {
        enemy.style.backgroundImage = "url(./assets/enemy.png)"
      } else if (counter === 1) {
        enemy.style.backgroundImage = 'url(./assets/enemy2.png)'
      } else if (counter === 2) {
        enemy.style.backgroundImage = 'url(./assets/enemy3.png)'
      }
      enemy.setAttribute(`data-location`, (-100 * this.gameSettings.traffic * (i + 1)).toString());
      enemy.style.top = +enemy.getAttribute('data-location') + 'px';
      enemy.style.left = Math.floor(Math.random() * (this.gameArea.nativeElement.offsetWidth - 50)) + 'px';
      this.gameArea.nativeElement.append(enemy);
    }
  };
  moveEnemy () {
    document.querySelectorAll('.enemy').forEach((item, index) => {
      //Регистрация столкновений
      //Получаем координаты автомобилей
      let carRect = this.car.nativeElement.getBoundingClientRect();
      let enemyRect = (item as HTMLElement).getBoundingClientRect();
      //Проверяем на столкновение
      if(carRect.top <= enemyRect.bottom &&
        carRect.right >= enemyRect.left &&
        carRect.left <= enemyRect.right &&
        carRect.bottom >= enemyRect.top) {
        this.gameSettings.start = false;
        document.querySelectorAll('.enemy').forEach((item, thisIndex) => {
          if(thisIndex !== index) {
            item.remove();
          }
        })
      }
      //Перемещение врагов
      item.setAttribute('data-location', (+item.getAttribute('data-location') + this.gameSettings.speed/2).toString());
      (item as HTMLElement).style.top = item.getAttribute('data-location') + 'px';
      if(+item.getAttribute('data-location') >= document.querySelector('.gameArea').clientHeight) {
        item.setAttribute(`data-location`, (-100 * this.gameSettings.traffic).toString());
        (item as HTMLElement).style.left = Math.floor(Math.random() * (this.gameArea.nativeElement.offsetWidth - 50)) + 'px';
      }
    })
  }

  gameProcess() {
    const newAnimation = () => {
      //если игра идет
      if(this.gameSettings.start) {
        //Считаем очки
        this.gameSettings.score += Math.floor(this.gameSettings.speed/2);
        if(this.gameSettings.bestScore > this.gameSettings.score) {
          this.score.emit(this.gameSettings.score);
          //this.bestScore.emit(this.gameSettings.bestScore);
        } else {
          this.score.emit(this.gameSettings.score);
          this.bestScore.emit(this.gameSettings.score);
        }
        //Усложнение игры каждую 1000 очков
        if(!(this.gameSettings.score % 1000)) {
          this.gameSettings.speed += 0.5;
          this.gameSettings.traffic -= 1;
          console.log(document.querySelectorAll('.enemy').length);
          console.log(this.gameQuantityElementElements(100 * this.gameSettings.traffic));
          if(document.querySelectorAll('.enemy').length <= this.gameQuantityElementElements(100 * this.gameSettings.traffic)) {
            const enemy = document.createElement('div');
            enemy.classList.add('enemy');
            enemy.setAttribute(`data-location`, (-100 * this.gameSettings.traffic * document.querySelectorAll('.enemy').length).toString());
            enemy.style.top = +enemy.getAttribute('data-location') + 'px';
            enemy.style.left = Math.floor(Math.random() * (this.gameArea.nativeElement.offsetWidth - 50)) + 'px';
            this.gameArea.nativeElement.append(enemy);
          }
        }
        //Спавн разметки
        this.roadLineLocation +=  this.gameSettings.speed;
        this.moveRoadLine();
        //Спавн врагов
        this.moveEnemy();
        //Управление машиной
        this.carLocation.x = this.car.nativeElement.offsetLeft;
        this.carLocation.y = this.car.nativeElement.offsetTop;
        if(this.keys.ArrowRight && this.carLocation.x < 250) {
          this.carLocation.x +=  this.gameSettings.speed;
        }
        if(this.keys.ArrowLeft && this.carLocation.x > 0) {
          this.carLocation.x -=  this.gameSettings.speed;
        }
        if(this.keys.ArrowUp && this.carLocation.y > 0) {
          this.carLocation.y -=  this.gameSettings.speed;
        }
        if(this.keys.ArrowDown && this.carLocation.y < 500) {
          this.carLocation.y +=  this.gameSettings.speed;
        }
        this.car.nativeElement.style.left = this.carLocation.x + 'px';
        this.car.nativeElement.style.top = this.carLocation.y + 'px';
        //Отдаем всю анимацию requestAnimationFrame чтобы все было плавно
        requestAnimationFrame(newAnimation);
      } else {
        //если игра закончилась
        //Записываем новый рекорд
        if(this.gameSettings.score > this.gameSettings.bestScore) {
          localStorage.setItem('race', JSON.stringify(this.gameSettings.score));
        }
        //Возвращаем настройки сложности
        this.gameSettings.speed = 5;
        this.gameSettings.traffic = 3;
        //Запускаем анимации
        this.stateCar = 'none';
        setTimeout( () => {
          this.vieBestScore.emit(true);
          this.vieScore.emit(false);
          this.stateEnemy = 'none';
          this.stateTopTunnel = 'none';
          this.stateDownTunnel = 'none';
          this.stateLeftRoadside = 'none';
          this.stateRightRoadside = 'none';
          this.stateGameArea = 'none';
          document.querySelectorAll('.line').forEach((item) => {
            item.remove();
          });
          document.querySelector('.enemy').remove();
          setTimeout(() => {
            this.game.nativeElement.style.display = 'none';
            this.vieButton.emit(true);
          }, 2000);
        }, 2000)
      }
    }
    newAnimation();
  }
}


