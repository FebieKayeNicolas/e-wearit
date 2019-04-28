import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { LoginPage} from '../login/login';
import { SignupPage} from '../signup/signup';

@Component({
  selector: 'page-landing-page',
  templateUrl: 'landing-page.html'
})
export class LandingPagePage {
  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController) {
  }
  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

  signup()
  {
  this.navCtrl.push(SignupPage);
  }

}



