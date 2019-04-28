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
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {

  info: any;
  base64Image: string;
  base64ImagePath: string;

  @ViewChild("item") item;
  @ViewChild("description") description;
  @ViewChild("price") price;

  
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

  saveProduct(){

    console.log(this.item.value);
    var headers = new Headers();
      headers.append("Accept", 'application/json');  
      headers.append('Content-Type', 'application/json' );
      
      let options = new RequestOptions({ headers: headers });
      
      let data = {

        id: this.info.id,
        image: "",
        item: this.item.value,
        decription: this.description.value,
        price: this.price.value,
       


      };
  
      let loader = this.loading.create({
  
        content: 'Processing please wait…',
  
      });
  
      loader.present().then(() => {
  
        this.http.post('http://localhost/ewearit/api/edit_product.php',data, options)
        .map(res => res.json())
        .subscribe(res => {
    
          loader.dismiss();
      });
    });
  }
}
