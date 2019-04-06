import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  forecast = [];
  city;
  now = new Date();
  tempDates = [];
  results = [];
  selectedDay;
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  minMax;
  weatherNow;

  constructor(public navCtrl: NavController, private http: HttpClient, private params: NavParams) {
    this.city = this.params.get('city');
  }

  ionViewDidLoad = () => {
    this.http.get('https://api.openweathermap.org/data/2.5/weather?q='+this.city+',JP&units=metric&appid=06f69d6aea01e2dbd9560f10fa31a7c9').subscribe((response) => {
      console.log("now", response);
      this.weatherNow = response;
    });
    this.http.get('https://api.openweathermap.org/data/2.5/forecast?q='+this.city+',JP&units=metric&appid=06f69d6aea01e2dbd9560f10fa31a7c9').subscribe((response: any) => {
      let date = new Date();
      this.selectedDay = date.getDate();
      date.setDate(date.getDate() + 4);
      date.setHours(23,59,59);
      this.forecast = response.list.filter((item) =>{
        let dayOfForecast = new Date(item.dt_txt);
        if (dayOfForecast < date){
          if (!this.tempDates.some(elem => elem.day == dayOfForecast.getDate())) {
            this.tempDates.push({day: dayOfForecast.getDate(), month: dayOfForecast.getMonth(), weekday: dayOfForecast.getDay()});
          }
          return true;
        }
        return false;
      });
      // console.log(this.tempDates);
      // console.log(this.forecast);
      this.results = this.forecast.filter((item) => {
        return new Date(item.dt_txt).getDate() == new Date().getDate();
      });
    });
  }

  filterDate = (date) => {
    this.selectedDay = date.day;
    this.results = this.forecast.filter((item) => {
      return new Date(item.dt_txt).getDate() == date.day;
    });
    console.log(this.results);
    this.minMax = this.findMinMax(this.results);
  }

  findMinMax = (arr) => {
    let min = arr[0].main.temp, max = arr[0].main.temp;
  
    for (let i = 1, len=arr.length; i < len; i++) {
      let v = arr[i].main.temp;
      min = (v < min) ? v : min;
      max = (v > max) ? v : max;
    }
  
    return [min, max];
  }

}
