import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { MenuPage } from '../pages/menu/menu';
import { timer } from 'rxjs/observable/timer';
import { CreatePostPage } from '../pages/create-post/create-post';
import { ProfilePage } from '../pages/profile/profile';
import { TermsAndConditionPage } from '../pages/terms-and-condition/terms-and-condition';
import { NewsfeedPage } from '../pages/newsfeed/newsfeed';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) navCtrl: Nav;
    rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    platform.ready().then(() => {
   
      //  if(!localStorage.getItem('server_response')){
         this.rootPage = MenuPage;
      //  } else{
      //      this.rootPage = MenuPage;
      //   }

      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

}
