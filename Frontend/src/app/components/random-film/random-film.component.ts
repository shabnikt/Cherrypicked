import { Component, OnInit } from '@angular/core';
import { ListContentService } from '../../services/list-content.service';
import { ConfigService } from '../../services/config.service';
import { Config } from '../../model/config';
import { ListContent } from '../../model/list-content';
import { Film } from '../../model/film';
import { HttpErrorResponse } from '@angular/common/http';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-random-film',
  templateUrl: './random-film.component.html',
  styleUrl: './random-film.component.css'
})
export class RandomFilmComponent  implements OnInit {
  pageOpened: boolean = false;
  showFilms: boolean = false;
  showWinner: boolean = false;

  currentRounds: string[] = [];
  stages: { [key: string]: any[] } = {};

  pairIndex: number = 0;
  roundIndex: number = 0;
  winnerList: Film[] = [];
  constructor(private listContentService: ListContentService,
              private configService: ConfigService,
              private filmService: FilmService) { }

  ngOnInit(): void {
    this.getFilms();
  }

  getFilms(): void {
    this.listContentService.getEntities().subscribe(
      (response: ListContent[]) => {
        let films: Film[] = this.filterFilms(response);
        console.log("selected films are", films);
        this.getRandomFilms(films);
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  filterFilms(lists: ListContent[]) {
    let filteredLists = lists.filter(list => list.listUse);
    let allFilms: Film[] = [];
    filteredLists.forEach(list => {
      allFilms = allFilms.concat(list.films);
    });
    let unicFilms = allFilms.filter((film, index, self) =>
    index === self.findIndex(f => (
        f.pkFilm === film.pkFilm
    )));
    let filteredFilms = unicFilms.filter(obj => obj.filmUse === true);
    return filteredFilms;
  }

  getRandomFilms(films: Film[]): any {
    this.configService.getEntities().subscribe(
      (response: Config[]) => {
        let randomAmount = response[0].randomAmount;
        console.log("randomAmount is", randomAmount);
        let randomFilms: Film[] = this.getRandomUniqueFilms(films, randomAmount);
        console.log("randomFilms are", randomFilms);
        this.createTurnament(randomFilms, randomAmount);
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  getRandomUniqueFilms(originalList: any[], count: number): any[] {
    const randomElements: any[] = [];
    const copiedList = [...originalList];

    while (randomElements.length < count && copiedList.length > 0) {
      const randomIndex = Math.floor(Math.random() * copiedList.length);
      const randomElement = copiedList.splice(randomIndex, 1)[0]; 
      randomElements.push(randomElement);
    }

    return randomElements;
  }

  createTurnament(films: Film[], amount: number) {
    let allRounds = ["64th-finals","32nd-finals", "16th-finals", "Eighth-finals", "Quarterfinals", "Semifinals", "Final"];
    this.currentRounds = allRounds.slice(7 - Math.log2(amount));
    console.log(this.currentRounds);
    this.currentRounds.forEach(round => {
      this.stages[round] = [];
    });
    console.log(this.stages);
    this.fillNextRound(films);
    this.showFilms = true;
  }

  fillNextRound(films: Film[]) {
    for (let i = 0; i < films.length; i += 2) {
      this.stages[this.currentRounds[this.roundIndex]].push([films[i], films[i + 1]]);
    };
    console.log(this.stages);
  }

  openPage(url: string) {
    this.pageOpened = true;
    window.open(url, '_blank');
  }

  switchWatched(film: Film) {
    console.log('watched!');
    this.pageOpened = true;
    film.filmWatched = !film.filmWatched;
    film.filmUse = !film.filmWatched;

    this.filmService.updateEntity(film).subscribe(
        (response: Film) => {
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  chooseFilm(film: Film) {
    if (!this.pageOpened) {
      console.log("You chose", film.filmName);
      this.winnerList.push(film);
      this.checkNextTurn();
    } else {
      this.pageOpened = false;
    }
  }

  checkNextTurn() {
    if (this.pairIndex + 1 < this.stages[this.currentRounds[this.roundIndex]].length) {
      this.pairIndex += 1;
    } else if (this.roundIndex + 1 === this.currentRounds.length) {
      this.showWinner = true;
      this.showFilms = false;
    }
     else {
      this.pairIndex = 0;
      this.roundIndex += 1;
      this.fillNextRound(this.winnerList);
      this.winnerList = [];
    }
  }
}