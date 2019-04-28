import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { CreatePostPage } from '../create-post/create-post';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  info1: any;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController,  private http: Http, public loading: LoadingController) {
    const data = JSON.parse(localStorage.getItem('server_response'));
    this.info1 = data.server_response;
    console.log(this.info1.username)
  }
  
  ionViewDidLoad(){

        // this.getfeed();
      }
      
      ngOnInit(){   
        
         }

  CreatePost(){
    this.navCtrl.push(CreatePostPage);
  }


  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({

      title: 'Menu Profile',
      buttons: [
        {
          text: 'Edit Profile',
          role: 'profile',
        handler: () => {
            this.navCtrl.push(EditProfilePage);
          }
        },{
          text: 'Delete Profile',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
