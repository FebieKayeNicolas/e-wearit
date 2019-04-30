import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreatePostPage } from '../create-post/create-post';
import { ProfilePage } from '../profile/profile';
import { EditProductPage } from '../edit-product/edit-product';
import { ChatPage } from '../chat/chat';
import { LoadingController } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import 'rxjs/add/operator/map';
import { ActionSheetController } from 'ionic-angular';
import {Events} from 'ionic-angular';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html'
})
export class ProductDetailsPage {

  titles:any;
  item:any;

  constructor(public navCtrl: NavController, 
    public events: Events, 
    private http: Http, 
    public navParams: NavParams, 
    public loading: LoadingController, 
    public actionSheetCtrl: ActionSheetController) {
    
    this.item =navParams.get('item');
    events.subscribe('star-rating:changed', (starRating) => {console.log(starRating)});

  }
  
  ionViewDidLoad(){
    console.log(this.item);
  this.getfeed();

      }

      getfeed(){
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        let options = new RequestOptions({ headers: headers });
           
         let loader = this.loading.create({
            // content: 'Processing please wait...',
          });
        
         loader.present().then(() => {
        
        this.http.post('http://localhost/ewearit/api/fetch_data.php',options)
        .map(res => res.json())
        .subscribe(res => {
        
         loader.dismiss()
        this.titles=res.server_response;
        
        console.log(this.titles);
        });
        });
      }
    
      ngOnInit(){   
        
         }

         presentActionSheet() {
          const actionSheet = this.actionSheetCtrl.create({
            title: 'Home',
            buttons: [
              {
                text: 'Delete',
                role: 'profile',
                handler: () => {
                  // this.navCtrl.push(EditProfilePage);
                  console.log('Archive clicked');
                }
              },{
                text: 'Edit',
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

 chat(){
    this.navCtrl.push(ChatPage, {"user": {id: this.item.user_id_fk}});
  }

  editProduct(){
    this.navCtrl.push(EditProductPage);
  }

}
