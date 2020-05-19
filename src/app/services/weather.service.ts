import { Injectable } from '@angular/core';
import { Router} from '@angular/router'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const ApiUrl = 'http://localhost:8888/weather.php?';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  constructor(private http: HttpClient,private route:Router) { }


  findWeather(location : any): Observable<any> {
    return this.http.get<{data: any}>(ApiUrl + `command=search&keyword=${location}`)
      .pipe(
        map(result => {
            return result;
        })
      );
  }
  getWeatherDetails(woeid : any): Observable<any> {
    return this.http.get<{data: any}>(ApiUrl + `command=location&woeid=${woeid}`)
      .pipe(
        map((result:any) => {
            return result;
        })
      );
  }
}
