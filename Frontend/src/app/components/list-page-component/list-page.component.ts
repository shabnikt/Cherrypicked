import { Component, OnInit, ViewChild } from '@angular/core';
import { merge, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ListContent } from '../../model/list-content';
import { MatPaginator } from '@angular/material/paginator';
import { ListContentService } from '../../services/list-content.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FilmService } from '../../services/film.service';
import { Film } from '../../model/film';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit {
  pageOpened: boolean = false;
  hideUnUse: boolean = false;
  listAddress: string = "";
  list!: ListContent;
  dataSource?: any[];
  dataSize?: number;
  sidebar: {all: number, watched: number, persent:number} = {all: 0, watched: 0, persent:0};
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private route: ActivatedRoute,
              private listContentService: ListContentService,
              private filmService: FilmService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log("params are:", params);
      this.listAddress = params['list_id'];
      this.getList(this.listAddress);
      this.getSidebar();
    });
  }

  public getList(listAddress: string): void{
    this.listContentService.findByAddress(listAddress).subscribe(
      (response: ListContent) => {
        this.list = response;
        this.sortFilms();
        this.filterFilms();
        this.dataSize = this.list.films.length;
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
        return of(this.list.films);
      })
    ).subscribe(res => {
      const from = this.paginator.pageIndex * 50;
      const to = from + 50;
      this.dataSource = res!.slice(from, to);
    });
  }

  sortFilms() {
    this.list.films = this.list.films.sort((a, b) => a.filmName.localeCompare(b.filmName));
  }

  filterFilms() {
    if (this.hideUnUse) {
      this.list.films = this.list.films.filter(obj => obj.filmUse === true);
    }
  }

  getSidebar(){
    this.listContentService.findByAddress(this.listAddress).subscribe(
      (response: ListContent) => {
        this.sidebar.all = this.list.films.length;
        this.sidebar.watched = this.list.films.filter(obj => obj.filmWatched === true).length;
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
    this.getList(this.listAddress);
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
    this.pageOpened = true;
    film.filmWatched = !film.filmWatched;
    if (film.filmWatched) {
      film.filmUse = false;
    }
    console.log(film);
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
