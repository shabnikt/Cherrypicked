import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film as Entity} from '../model/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiServerUrl = environment.apiBaseUrl;
  private serverUrl = 'film';

  constructor(private http: HttpClient){}

  public getEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(`${this.apiServerUrl}/${this.serverUrl}/all`);
  }

  public findById(id: string): Observable<Entity> {
    return this.http.get<Entity>(`${this.apiServerUrl}/${this.serverUrl}/find/${id}`);
  }
  
  public addEntity(entity: Entity): Observable<Entity> {
    return this.http.post<Entity>(`${this.apiServerUrl}/${this.serverUrl}/add`, entity);
  }

  public updateEntity(entity: Entity): Observable<Entity> {
    return this.http.put<Entity>(`${this.apiServerUrl}/${this.serverUrl}/update`, entity);
  }

  public deleteEntity(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${this.serverUrl}/delete/${id}`);
  }
}
