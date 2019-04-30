import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoryNewsfeedPage } from '../category-newsfeed/category-newsfeed';


@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {

  constructor(public navCtrl: NavController) {

  }


  catFeed(value:any){
    this.navCtrl.push(CategoryNewsfeedPage,{value:value});
  }



}
