import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListContent as Entity} from '../model/list-content';

@Injectable({
  providedIn: 'root'
})
export class ListContentService {
  private apiServerUrl = environment.apiBaseUrl;
  private serverUrl = 'list-content';

  constructor(private http: HttpClient){}

  public getEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(`${this.apiServerUrl}/${this.serverUrl}/all`);
  }

  public findById(id: string): Observable<Entity> {
    return this.http.get<Entity>(`${this.apiServerUrl}/${this.serverUrl}/find/${id}`);
  }

  public findByAddress(address: string): Observable<Entity> {
    return this.http.get<Entity>(`${this.apiServerUrl}/${this.serverUrl}/address/${address}`);
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
