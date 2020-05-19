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
              private weatherService : WeatherService,
              private actRoute : ActivatedRoute ) { }

  ngOnInit(): void {
    this.WeatherData = [];
    let routeparams = this.actRoute.snapshot.params;
    console.log('today',this.today)
    if(Object.keys(routeparams).length == 0){
      let locations = ['Istanbul', 'Berlin', 'London', 'Helsinki', 'Dublin', 'Vancouver'];
      this.findWeather(locations);
      console.log('WeatherData -- ',this.WeatherData);
    }
    else if(routeparams.woeid){
      this.woeid = routeparams.woeid;
      this.getWeatherDetails();
    }
    else if(routeparams.location){
      this.location = routeparams.location;
      this.SearchLocation();
    }
  }
  SearchLocation(){
    this.inputerror = false;
    if(this.location == null){
      this.inputerror = true;
      return;
    }
    this.router.navigate(['/search', this.location]);
    this.SearchWeather();
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
      console.log('err',err);
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

  roundup(value){
    return Math.floor(value);
  }

  getIcon(attribute){
    let Url = `https://www.metaweather.com/static/img/weather/png/${attribute}.png`;
    return Url;
  }

}
