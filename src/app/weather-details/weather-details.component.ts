import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {
  woeid;
  WeatherData:any = [] ;
  nodata:boolean =false;
  inputerror : boolean;
  isLoading: boolean = false;
  nooutput:boolean= false;

  constructor(private actRoute : ActivatedRoute,private weatherService : WeatherService) {
    let routeparams = this.actRoute.snapshot.params;
    console.log('params',routeparams)
    this.actRoute.paramMap.subscribe(params => {
      this.woeid = params.get('woeid');
      console.log('location',this.woeid);
    });
    this.getWeatherDetails();
  }

  ngOnInit(): void {

  }

  getWeatherDetails(){
    this.nooutput = false;
    this.isLoading = true;
    this.WeatherData =[];
    this.weatherService.getWeatherDetails(this.woeid).subscribe(data =>{
      this.isLoading = false;
      if(data.woeid){
        this.WeatherData.push(data);
      }
      else{
        this.isLoading = false;
        this.nooutput = true;
      }
    })
  }
  getIcon(attribute){
    let Url = `https://www.metaweather.com/static/img/weather/png/${attribute}.png`;
    return Url;
  }
  roundup(value){
    return Math.floor(value);
  }

}
