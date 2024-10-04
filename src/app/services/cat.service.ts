import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class CatService {
  private apiKey = environment.apiKey
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getUrl(breedId: string, limit: number = 10): string {
    return `${this.apiUrl}/images/search?breed_ids=${breedId}&limit=${limit}&api_key=${this.apiKey}`
  }
  getBreeds(): Observable<any> {
    return this.http.get(`${this.apiUrl}/breeds`)
  }

  getCatsByBreed(breedId: string, limit: number): Observable<any> {
    return this.http.get(this.getUrl(breedId, limit))
  }
}
