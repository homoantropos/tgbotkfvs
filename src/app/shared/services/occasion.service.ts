import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Occasion} from "../interfaces";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class OccasionService {

  constructor(
    private http: HttpClient
  ) { }

  createOccasion(occasion: Occasion, image?: File): Observable<{message: string, occasion: Occasion}> {
    const fd = new FormData();
    Object.keys(occasion).map(
      key => fd.set(key, occasion[key])
    )
    if(image) {
      fd.append('image', image, image.name);
    }
    return this.http.post<{message: string, occasion: Occasion}>(`${environment.backURI}/occasions/create`, fd);
  }

  updateOccasion(occasion: Occasion, image?: File): Observable<{message: string, occasion: Occasion}> {
    const fd = new FormData();
    Object.keys(occasion).map(
      key => fd.set(key, occasion[key])
    )
    if(image) {
      fd.append('image', image, image.name);
    }
    return this.http.patch<{message: string, occasion: Occasion}>(`${environment.backURI}/occasions/${occasion.id}`, fd);
  }

  deleteOccasion(id: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${environment.backURI}/occasions/${id}`)
  }

  getAllOccasions(): Observable<Array<Occasion>> {
    return this.http.get<Array<Occasion>>(`${environment.backURI}/occasions`)
  }

  getOccasionById(id: number): Observable<Occasion> {
    return this.http.get<Occasion>(`${environment.backURI}/occasions/${id}`);
  }
}
