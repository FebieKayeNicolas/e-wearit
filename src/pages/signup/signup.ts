import { Component, ViewChild  } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
// import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({

selector: 'page-signup',

templateUrl: 'signup.html'

})

export class SignupPage {
    

@ViewChild("email") email;
@ViewChild("username") username;
@ViewChild("mobile") mobile;
@ViewChild("password") password;
@ViewChild("firstname") firstname;
@ViewChild("lastname") lastname;

constructor(public navCtrl: NavController, public alertCtrl: AlertController,  private http: Http,  public loading: LoadingController) {

}

signIn(){

  this.navCtrl.push(LoginPage);

}


signUp(){

//// check to confirm the username, email, telephone and password fields are filled

if(this.username.value=="" ){
    
    let alert = this.alertCtrl.create({
    
    title:"ATTENTION",
    
    subTitle:"Username field is empty",
    
    buttons: ['OK']
    
    });
    
    alert.present();
    
    } else
    
    if(this.email.value==""){
    
    let alert = this.alertCtrl.create({
    
    title:"ATTENTION",
    
    subTitle:"Email field is empty",
    
    buttons: ['OK']
    
    });
    
    alert.present();
    
    }
    
    else
    
    if(this.mobile.value=="" ){
    
    let alert = this.alertCtrl.create({
    
    title:"ATTENTION",
    
    subTitle:"Mobile field is empty",
    
    buttons: ['OK']
    
    });
    
    alert.present();
    
    } 

    else
    
    if(this.password.value=="" ){
    
    let alert = this.alertCtrl.create({
    
    title:"ATTENTION",
    
    subTitle:"Password field is empty",
    
    buttons: ['OK']
    
    });
    
    alert.present();
    
    }
    
    else
    
    if(this.firstname.value=="" ){
    
    let alert = this.alertCtrl.create({
    
    title:"ATTENTION",
    
    subTitle:"Firstname field is empty",
    
    buttons: ['OK']
    
    });
    
    alert.present();
    
    }

    else
    
    if(this.lastname.value=="" ){
    
    let alert = this.alertCtrl.create({
    
    title:"ATTENTION",
    
    subTitle:"Lastname field is empty",
    
    buttons: ['OK']
    
    });
    
    alert.present();
    
    }

    else
    
    {
    
    var headers = new Headers();
    
    headers.append("Accept", 'application/json');
    
    headers.append('Content-Type', 'application/json' );
    
    let options = new RequestOptions({ headers: headers });
    
    let data = {
    
    username: this.username.value,
    email: this.email.value,
    mobile: this.mobile.value,
    password: this.password.value,
    firstname: this.firstname.value,
    lastname: this.lastname.value,


    };
    
    let loader = this.loading.create({
    
    content: 'Processing please wait…',
    
    });
    
    loader.present().then(() => {
    
    this.http.post('http://localhost/ewearit/api/register.php',data, options)
    
    .map(res => res.json())
    
    .subscribe(res => {
    
    loader.dismiss()
    
    if(res=="Added successfuly"){
    
      let alert = this.alertCtrl.create({
      
      title:"CONGRATS",
      
      subTitle:(res),
      
      buttons: ['OK']
      
      });
      
      alert.present();
      
      this.navCtrl.setRoot(LoginPage);
    
    }
    else {
    
      let alert = this.alertCtrl.create({
      
      title:"ERROR",
      
      subTitle:("Failed to add"),
      
      buttons: ['OK']
      
      });
      
      alert.present();
    
    }
    
    });
    
    });
    
    }
    
    }
  }
