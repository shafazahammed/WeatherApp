import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent} from './home/home.component';
import { SearchComponent } from './search/search.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:location', component: SearchComponent },
  { path: 'weather/:woeid', component : WeatherDetailsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{
      useHash: true
    })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
