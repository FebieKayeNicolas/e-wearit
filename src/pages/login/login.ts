import { Component, ViewChild  } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { ProfilePage } from '../profile/profile';
import { MenuPage } from '../menu/menu';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { environment } from '../../providers/environment';
import 'rxjs/add/operator/map';

@Component({

  selector: 'page-login',
  templateUrl: 'login.html'

})

export class LoginPage {
 
  info: any;
  info2: any;
  
  @ViewChild("username") username;
  @ViewChild("password") password;

  data:string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    private http: Http, public loading: LoadingController) {

  }

  signUp(){

    this.navCtrl.push(SignupPage);

  }

  signIn(){

    if(this.username.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Username field is empty",
        buttons: ['OK']

      });

      alert.present();

    } else if(this.password.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Password field is empty",
        buttons: ['OK']

      });

      alert.present();

    } else {

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );

      let options = new RequestOptions({ headers: headers });

      let data = {

        username: this.username.value,
        password: this.password.value

      };

      let loader = this.loading.create({

        content: 'Please wait…',

      });

      loader.present().then(() => {

        this.http.post(environment.ip+'/ewearit/api/login.php',data,options)

        .map(res => res.json())

        .subscribe(res => {

          loader.dismiss()

          localStorage.setItem('server_response', JSON.stringify(res));
          const data = JSON.parse(localStorage.getItem('server_response'));
          this.info2 = data.server_response;
          console.log(this.info2);

          if(this.info2==="Your Login Email or Password is invalid"){

            let alert = this.alertCtrl.create({

              title:"ERROR",
              subTitle:"Your Login Username or Password is invalid",
              buttons: ['OK']

            });

            alert.present();

          }else{
            
            this.navCtrl.setRoot(MenuPage);
            
          }

        });

      });

    }

  }

}