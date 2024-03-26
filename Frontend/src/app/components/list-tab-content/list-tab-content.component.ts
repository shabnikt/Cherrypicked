import { Component, OnInit, ViewChild } from '@angular/core';
import { merge, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ListContentService } from '../../services/list-content.service';
import { ListContent } from '../../model/list-content';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { ListService } from '../../services/list.service';
import { List } from '../../model/list';

@Component({
  selector: 'app-list-tab-content',
  templateUrl: './list-tab-content.component.html',
  styleUrl: './list-tab-content.component.css'
})
export class ListTabContentComponent {
  public lists!: ListContent[];
  filmsLabel: string = "Films from this list";
  dataSource?: any[];
  dataSize?: number;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private listContentService: ListContentService,
              private listService: ListService) {}

  ngOnInit(){
    this.getLists();
   }

  public getLists(): void{
    this.listContentService.getEntities().subscribe(
      (response: ListContent[]) => {
        this.lists = response;
        this.dataSize = this.lists.length;
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
        return of(this.lists);
      })
    ).subscribe(res => {
      const from = this.paginator.pageIndex * this.paginator.pageSize;
      const to = from + this.paginator.pageSize;
      this.dataSource = res!.slice(from, to);
    });
  }

  onToggleChange(pkList: string) {
    this.listService.updateEntity(pkList).subscribe(
        (response: List) => {
          console.log('updated');
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  createEmptyFilms(films: []) {
    let leng: number;
    if (films.length >= 5) {
      leng = 0;
    } else {
      leng = 5 - films.length;
    }

    const numberList: number[] = [];
    for (let i = 0; i < leng; i++) {
      numberList.push(i);
    }
    return numberList
  }   
}
