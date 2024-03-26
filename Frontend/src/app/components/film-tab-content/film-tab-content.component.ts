import { Component, OnInit, ViewChild } from '@angular/core';
import { merge, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { FilmService } from '../../services/film.service';
import { ListContentService } from '../../services/list-content.service';
import { MatPaginator } from '@angular/material/paginator';
import { Film } from '../../model/film';
import { HttpErrorResponse } from '@angular/common/http';
import { ListContent } from '../../model/list-content';

@Component({
  selector: 'app-film-tab-content',
  templateUrl: './film-tab-content.component.html',
  styleUrl: './film-tab-content.component.css'
})
export class FilmTabContentComponent implements OnInit {
  pageOpened: boolean = false;
  hideUnUse: boolean = false;
  useFilms: Film[] = [];
  films: Film[] = [];
  dataSource?: any[];
  dataSize?: number;
  sidebar: {all: number, watched: number, persent:number} = {all: 0, watched: 0, persent:0};
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private filmService: FilmService,
              private listContentService: ListContentService) { }

  ngOnInit(): void {
    this.getFilms();
  }

  public getFilms(): void{
    this.listContentService.getEntities().subscribe(
      (response: ListContent[]) => {
        this.getUnicFilms(response);
        this.getSidebar();
        this.sortFilms();
        this.filterFilms();
        this.dataSize = this.films.length;
        this.linkListToPaginator();
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  linkListToPaginator() {
    merge(this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        return of(this.films);
      })
    ).subscribe(res => {
      const from = this.paginator.pageIndex * 50;
      const to = from + 50;
      this.dataSource = res!.slice(from, to);
    });
  }
  
  getUnicFilms(lists: ListContent[]) {
    
    let filteredLists = lists.filter(list => list.listUse);
    
    let allFilms: Film[] = [];
    filteredLists.forEach(list => {
      allFilms = allFilms.concat(list.films);
    });
    
    this.films = allFilms.filter((film, index, self) =>
    index === self.findIndex(f => (
        f.pkFilm === film.pkFilm
    )));
    
  }

  sortFilms() {
    this.films = this.films.sort((a, b) => a.filmName.localeCompare(b.filmName));
  }

  filterFilms() {
    this.useFilms = this.films.filter(obj => obj.filmUse === true);
    if (this.hideUnUse) {
      this.films = this.films.filter(obj => obj.filmUse === true);
    }

  }

  getSidebar(){
    this.sidebar.all = this.films.length;
    this.sidebar.watched = this.films.filter(obj => obj.filmWatched === true).length;
    this.sidebar.persent = Math.round((this.sidebar.watched / this.sidebar.all) * 100)
  }

  openPage(url: string) {
    this.pageOpened = true;
    window.open(url, '_blank');
  }

  hideUnUseFilms() {
    this.hideUnUse = !this.hideUnUse;
    this.getFilms();
  }

  switchUse(film: Film) {
    if (!this.pageOpened) {
      this.filmService.updateEntity(film).subscribe(
          (response: Film) => {
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
    } else {
      this.pageOpened = false;
    }
  }

  switchWatched(film: Film) {
    console.log('watched!');
    this.pageOpened = true;
    film.filmWatched = !film.filmWatched;
    if (film.filmWatched) {
      film.filmUse = false;
    }
    this.filmService.updateEntity(film).subscribe(
        (response: Film) => {
          this.getFilms();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

}
