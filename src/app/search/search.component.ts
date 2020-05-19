import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private actRoute : ActivatedRoute,private weatherService : WeatherService) { }

  location : string;
  WeatherData : string[] = [] ;
  nooutput: boolean = false;
  inputerror:boolean  = false;
  isLoading :boolean =false;

  ngOnInit() {
    this.actRoute.paramMap.subscribe(params => {
      this.location = params.get('location');
      console.log('location',this.location);

    });
    // (<HTMLInputElement>document.getElementById("weatherLocation")).value = this.location;
    this.SearchWeather();
  }

  SearchLocation(){
    this.inputerror = false;
    if(this.location == null){
      this.inputerror = true;
      return;
    }
    this.SearchWeather();
  }

  SearchWeather(){

    this.isLoading = true;
    this.nooutput = false;
    this.WeatherData = [];

    this.weatherService.findWeather(this.location).subscribe(
      (data:any) => {
        console.log(data);
        if(data.length > 0 && data[0].woeid){
          this.weatherService.getWeatherDetails(data[0].woeid).subscribe(result =>{
              this.isLoading = false;
              this.WeatherData.push(result);
          });
        }
        else{
          this.isLoading = false;
          this.nooutput = true;
        }
      },
      err => {
        this.isLoading = false;
        this.nooutput = true;
      }
    );
  }


}
