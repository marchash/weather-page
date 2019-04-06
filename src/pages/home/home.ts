import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cities = ['Tokyo', 'Yokohama', 'Kyoto', 'Osaka', 'Sapporo', 'Nagoya'];

  constructor(public navCtrl: NavController) {
  }

  goTo = (city: string) => {
    this.navCtrl.push(AboutPage, {city: city});
  }
}
