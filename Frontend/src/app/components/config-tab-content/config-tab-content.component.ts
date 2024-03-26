import { Component, OnInit } from '@angular/core';
import { ListContentService } from '../../services/list-content.service';
import { ListContent } from '../../model/list-content';
import { HttpErrorResponse } from '@angular/common/http';
import { Film } from '../../model/film';
import { ConfigService } from '../../services/config.service';
import { Config } from '../../model/config';

@Component({
  selector: 'app-config-tab-content',
  templateUrl: './config-tab-content.component.html',
  styleUrl: './config-tab-content.component.css'
})
export class ConfigTabContentComponent implements OnInit {
  selectAmount: number[] = [];
  randomAmount: number = 32;
  filmAmount: number = 0;
  config!: Config;
  constructor(private listContentService: ListContentService,
              private configService: ConfigService) { }

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig() {
    this.getFilmAmount();
    this.getRandomAmount();
  }

  getFilmAmount(): void {
    this.listContentService.getEntities().subscribe(
      (response: ListContent[]) => {
        let films: Film[] = this.filterFilms(response);
        this.filmAmount = films.length;
        this.getSelectAmount();
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
        this.filmAmount = 0;
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

  getSelectAmount(){
    let allSelectAmounts: number[] = [8, 16, 32, 64, 128];
    this.selectAmount = allSelectAmounts.filter(amount => amount <= this.filmAmount);
    console.log(this.selectAmount);
  }

  getRandomAmount() {
    this.configService.getEntities().subscribe(
      (response: Config[]) => {
        this.config = response[0];
        this.randomAmount = response[0].randomAmount;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  onSelectionChange(event: any) {
    // console.log(event.value);
    this.config.randomAmount = event.value;
    console.log(this.config);
    this.configService.updateEntity(this.config).subscribe(
      (response: Config) => {
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
