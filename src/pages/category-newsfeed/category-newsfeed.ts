import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { Data } from '../../providers/data/data';
import { environment } from '../../providers/environment';
import 'rxjs/add/operator/map';

@Component({

  selector: 'page-category-newsfeed',
  templateUrl: 'category-newsfeed.html'

})

export class CategoryNewsfeedPage {

titles:any;
info: any;
item:any;
myInput:any;
value:any;

  constructor(public navCtrl: NavController,  private http: Http, public loading: LoadingController, public dataService: Data, public navParams: NavParams) {

    const data = JSON.parse(localStorage.getItem('server_response'));
    this.info = data.server_response;
    this.value = this.navParams.get('value');
  }
 
doRefresh(refresher){
  this.ionViewDidLoad();
   console.log('Begin async operation', refresher);

   setTimeout(()=> {
     console.log('Async operation has ended');
     refresher.complete();
   }, 500);
}

  ionViewDidLoad(){

    this.getfeed();
  console.log(this.info.username);
  }

  Content(item: any){
    console.log(item);
    this.navCtrl.push(HomePage, {item:item});
  }


  getfeed(){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let data = {

      category: this.value

    };
     let loader = this.loading.create({
        // content: 'Processing please wait...',
      });
    
     loader.present().then(() => {
    
    this.http.post(environment.ip+'/ewearit/api/fetch_cat.php',data,options)
    .map(res => res.json())
    .subscribe(res => {
    console.log(res)
     loader.dismiss()
    this.titles=res.server_response;
    
    console.log(this.titles);
    },err=>console.error(err));
    });
  }

  onInput(){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    if(this.myInput.trim() == ""){
      //console.log("empty");
      this.http.post(environment.ip+'/ewearit/api/fetch_cat.php',options)
      .map(res => res.json())
      .subscribe(res => {
      this.titles=res.server_response;
      });

    }else{
     // console.log("not empty");
      this.http.post(environment.ip+'/ewearit/api/fetch_search.php',JSON.stringify({myInput: this.myInput}),options)
      .map(res => res.json())
      .subscribe(res => {
      this.titles=res.server_response;
      });
    }

  }


  ngOnInit(){   
    
    }
    
     home(titles: any){
      
      console.log(titles);
      
      this.navCtrl.push(HomePage, {item: titles});
    
      }
    
    delete(index: number){
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });
         
       let loader = this.loading.create({
          content: 'Processing please wait...',
        });
      
       loader.present().then(() => {
      
      this.http.get(environment.ip+'/ewearit/api/delete.php?index='+this.titles[index]['id'],options)
      .map(res => res.json())
      .subscribe(res => {
      
       loader.dismiss()
      this.titles=res.server_response;
      
      console.log(this.titles);
      });
      });
    }

}