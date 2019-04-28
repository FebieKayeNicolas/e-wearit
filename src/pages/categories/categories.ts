import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TopsPage } from '../tops/tops';
import { PantsPage } from '../pants/pants';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {

  constructor(public navCtrl: NavController) {

  }
tops(){
  this.navCtrl.push(TopsPage);
}

pants(){
  this.navCtrl.push(PantsPage);
}

}
