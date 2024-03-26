import { Component, OnInit, ViewChild } from '@angular/core';
import { merge, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { FilmService } from '../../services/film.service';
import { Film } from '../../model/film';

@Component({
  selector: 'app-all-films-component',
  templateUrl: './all-films-component.component.html',
  styleUrl: './all-films-component.component.css'
})
export class AllFilmsComponentComponent implements OnInit {
  pageOpened: boolean = false;
  hideUnUse: boolean = false;
  films!: Film[];
  dataSource?: any[];
  dataSize?: number;
  sidebar: {all: number, watched: number, persent:number} = {all: 0, watched: 0, persent:0};
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    this.getFilms();
    this.getSidebar();
  }

  public getFilms(): void{
    this.filmService.getEntities().subscribe(
      (response: Film[]) => {
        this.films = response;
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

  sortFilms() {
    this.films = this.films.sort((a, b) => a.filmName.localeCompare(b.filmName));
  }

  filterFilms() {
    if (this.hideUnUse) {
      this.films = this.films.filter(obj => obj.filmUse === true);
    }
  }

  getSidebar(){
    this.filmService.getEntities().subscribe(
      (response: Film[]) => {
        this.sidebar.all = response.length;
        this.sidebar.watched = response.filter(obj => obj.filmWatched === true).length;
        this.sidebar.persent = Math.round((this.sidebar.watched / this.sidebar.all) * 100)
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }

  openPage(url: string) {
    this.pageOpened = true;
    window.open(url, '_blank');
  }

  hideUnUseFilms() {
    this.hideUnUse = !this.hideUnUse
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
          this.getSidebar();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

}
