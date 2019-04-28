import { Component, ViewChild  } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { NewsfeedPage } from '../newsfeed/newsfeed';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ActionSheetController } from 'ionic-angular';
import { environment } from '../../providers/environment';
import 'rxjs/add/operator/map';

@Component({
  
  selector: 'page-create-post',
  templateUrl: 'create-post.html'
  
  })
  
  export class CreatePostPage {
    
  info:any;

  @ViewChild("item") item;
  @ViewChild("description") description;
  @ViewChild("price") price;

    base64Image: string;
    base64ImagePath: string;

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController,  
    private http: Http,  
    public loading: LoadingController, 
    public toastCtrl: ToastController, 
    private camera: Camera, 
    public actionSheetCtrl: ActionSheetController) {;
      
    const data = JSON.parse(localStorage.getItem('server_response'));
    this.info = data.server_response;
  }
  
  Post(){
  
    if(this.item.value=="" || this.description.value=="" || this.price.value==""){
  
      let alert = this.alertCtrl.create({
        
        title:"ATTENTION",
        subTitle:"One or more fields are empty!",
        buttons: ['OK']
  
      });
  
      alert.present();
    
    } else {
   
      var headers = new Headers();
      headers.append("Accept", 'application/json');  
      headers.append('Content-Type', 'application/json' );
      
      let options = new RequestOptions({ headers: headers });
      
      let data = {

        item: this.item.value,
        description: this.description.value,
        image: this.base64ImagePath,
        price: this.price.value,
        user_id_fk: this.info.id
      
      };
  
      let loader = this.loading.create({
  
        content: 'Processing please wait…',
  
      });
  
      loader.present().then(() => {
  
        this.http.post(environment.ip+'/ewearit/api/createpost.php',data, options)
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
            this.navCtrl.setRoot(NewsfeedPage);
      
          } else {
            
            let alert = this.alertCtrl.create({
        
              title:"ERROR",
              subTitle:(res),
              buttons: ['OK']
        
            });
        
            alert.present();
      
          }
  
        });
      });
    }
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


}