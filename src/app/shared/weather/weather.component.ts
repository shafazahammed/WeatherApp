import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  @Input('WeatherData') WeatherData : [];
  @Input('woeid') woeid : string;
  @Input('nooutput') nooutput : boolean;
  @Input('isLoading') isLoading : boolean;

  todaydate;
  today;
  constructor() { }

  ngOnInit(): void {
    let weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    this.todaydate = new Date();
    console.log('today date',this.todaydate);
    this.today = weekday[this.todaydate.getDay()];
    console.log('woeid',this.woeid);
  }

  roundup(value){
    return Math.floor(value);
  }

  getIcon(attribute){
    let Url = `https://www.metaweather.com/static/img/weather/png/${attribute}.png`;
    return Url;
  }



}
