import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from '../home/home';
// import {TopsPage} from '../tops/tops';
import { LoadingController } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { Data } from '../../providers/data/data';
import 'rxjs/add/operator/map';


@Component({

  selector: 'page-tops',

  templateUrl: 'tops.html'

})

export class TopsPage {

titles:any;
  // searchTerm: string = '';

  constructor(public navCtrl: NavController,  private http: Http, public loading: LoadingController, public dataService: Data) {

  }

  ionViewDidLoad(){

    this.getfeed();
    // this.setFilteredItems();
  }

  Content(item: any){
    console.log(item);
    this.navCtrl.push(HomePage, {item:item});
  }
  
  // tops(){
  //   this.navCtrl.push(TopsPage);
  // }

  // setFilteredItems() {
    
  //          this.items = this.dataService.filterItems(this.searchTerm);
    
  //      }

  getfeed(){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
       
     let loader = this.loading.create({
        content: 'Processing please wait...',
      });
    
     loader.present().then(() => {
    
    this.http.post('http://localhost/ewearit/api/fetch_data_tops.php',options)
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
    
     home(items: any){
      
              console.log(items);
              
                  this.navCtrl.push(HomePage, {item: items});
              
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
      
      this.http.get('http://localhost/ewearit/api/delete.php?index='+this.titles[index]['id'],options)
      .map(res => res.json())
      .subscribe(res => {
      
       loader.dismiss()
      this.titles=res.server_response;
      
      console.log(this.titles);
      });
      });
    }

    // sort(){
      // this.descending = !this.descending;
      // this.order = this.descending ? 1 : -1;
    // }

}