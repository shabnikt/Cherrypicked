import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config as Entity} from '../model/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiServerUrl = environment.apiBaseUrl;
  private serverUrl = 'config';

  constructor(private http: HttpClient){}

  public getEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(`${this.apiServerUrl}/${this.serverUrl}/all`);
  }

  public updateEntity(entity: Entity): Observable<Entity> {
    return this.http.put<Entity>(`${this.apiServerUrl}/${this.serverUrl}/update`, entity);
  }
}
