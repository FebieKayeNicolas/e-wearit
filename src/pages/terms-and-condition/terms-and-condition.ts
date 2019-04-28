import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-terms-and-condition',
  templateUrl: 'terms-and-condition.html'
})
export class TermsAndConditionPage {

  constructor(public navCtrl: NavController) {
  }
  
}
