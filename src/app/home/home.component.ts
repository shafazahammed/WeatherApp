import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input('SearchData') data: any;

  location : string;
  woeid:any = null;
  todaydate:any;
  inputerror : boolean;
  weather : any = {};
  WeatherData :string[] = [];
  today : any;
  isLoading: boolean = false;
  nooutput:boolean= false;


  constructor(private router : Router,
              private weatherService : WeatherService
              ) { }

  ngOnInit(): void {
    this.WeatherData = [];
    let locations = ['Istanbul', 'Berlin', 'London', 'Helsinki', 'Dublin', 'Vancouver'];
    this.findWeather(locations);

  }
  SearchLocation(){
    this.inputerror = false;
    if(this.location == null){
      this.inputerror = true;
      return;
    }
    this.router.navigate(['/search', this.location]);
  }

  findWeather(locations){
    this.nooutput = false;
    this.isLoading = true;
    locations.forEach(location => {
      this.weatherService.findWeather(location).subscribe(
        (data:any) => {
          if(data.length > 0 && data[0].woeid){
            this.weatherService.getWeatherDetails(data[0].woeid).subscribe(result =>{
              this.isLoading = false;
              this.WeatherData.push(result);
            });
          }
        },
        err => {
          this.isLoading = false;
          console.log('err',err);
        }
      );
    });
  }


  getWeatherDetails(){
    this.nooutput = false;
    this.isLoading = true;
    this.WeatherData =[];
    this.weatherService.getWeatherDetails(this.woeid).subscribe(data =>{
      console.log('data res',data);
      this.isLoading = false;
      if(data.woeid){
        this.WeatherData.push(data);
        console.log('Weather',this.WeatherData)
      }
      else{
        this.isLoading = false;
        this.nooutput = true;
      }
    })
  }

}
