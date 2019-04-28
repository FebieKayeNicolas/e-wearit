import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ActionSheetController } from 'ionic-angular';
import 'rxjs/add/operator/map';
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  info: any;
  base64Image: string;
  base64ImagePath: string;

  @ViewChild("username") username;
  @ViewChild("firstname") firstname;
  @ViewChild("lastname") lastname;
  @ViewChild("password") password;
  @ViewChild("address") address;
  @ViewChild("gender") gender;
  @ViewChild("birthdate") birthdate;
  @ViewChild("mobile") mobile;
  @ViewChild("email") email;
  
  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController,  
    private http: Http,  public loading: LoadingController, 
    public toastCtrl: ToastController, 
    private camera: Camera, 
    public actionSheetCtrl: ActionSheetController) {   

    const data = JSON.parse(localStorage.getItem('server_response'));
    this.info = data.server_response;
    console.log(this.info.id);

  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Select Action',
      buttons: [
        {
          text: 'Photo Gallery',
          handler: () => {
            this.takePhoto(0);
          }
        },{
          text: 'Camera',
          handler: () => {
            this.takePhoto(1);
          }
        }
      ]
    });
    actionSheet.present();
  }


  takePhoto(sourceType:number) {
    console.log("coming here");

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 450,
      targetHeight: 450,
      saveToPhotoAlbum: false,
      sourceType:sourceType,
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.base64ImagePath = imageData;
      
      },
      err => {
        console.log("error");
      }
    );
  }

  saveProfile(){

    console.log(this.gender.value);
    var headers = new Headers();
      headers.append("Accept", 'application/json');  
      headers.append('Content-Type', 'application/json' );
      
      let options = new RequestOptions({ headers: headers });
      
      let data = {

        id: this.info.id,
        image: "",
        username: this.username.value,
        firstname: this.firstname.value,
        lastname: this.lastname.value,
        password: this.password.value,
        address: this.address.value,
        gender: this.gender.value,
        birthdate: this.birthdate.value,
        mobile: this.mobile.value,
        email: this.email.value


      };
  
      let loader = this.loading.create({
  
        content: 'Processing please wait…',
  
      });
  
      loader.present().then(() => {
  
        this.http.post('http://localhost/ewearit/api/edit_profile.php',data, options)
        .map(res => res.json())
        .subscribe(res => {
    
          loader.dismiss();
      });
    });
  }

  reset(){
    this.username = null;
    this.firstname = null;
    this.lastname = null;
    this.password = null;
    this.lastname = null;
    this.address = null;
    this.gender = null;
    this.birthdate = null;
    this.mobile = null;
    this.email = null;
  }
}
