import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { NewsfeedPage } from '../newsfeed/newsfeed';
import { ProfilePage } from '../profile/profile';
import { CategoriesPage } from '../categories/categories';
import { CreatePostPage } from '../create-post/create-post';
import { TermsAndConditionPage } from '../terms-and-condition/terms-and-condition';
import { ChatlistPage } from '../chatlist/chatlist';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  info: any;
  rootPage: any = NewsfeedPage;

  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('server_response'));
    this.info = data.server_response;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  Profile(){
    this.nav.push(ProfilePage);
  }
  TermsCon(){
    this.nav.push(TermsAndConditionPage);
  }
  Newsfeed(){
    this.nav.push(NewsfeedPage);
  }
  ChatList(){
    this.nav.push(ChatlistPage);
  }
  Categories(){
    this.nav.push(CategoriesPage);
  }
  CreatePost(){
    this.nav.push(CreatePostPage);
  }

  backToWelcomePage(){
    this.nav.setRoot(WelcomePage);
    this.nav.popToRoot();
  }

  logout(){
    localStorage.clear();
    setTimeout(()=> this.backToWelcomePage(), 1000);
  }

}
