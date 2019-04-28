import { Component, ViewChild, OnInit  } from '@angular/core';
import { NavController, AlertController,NavParams } from 'ionic-angular';
// import { LoginPage } from '../login/login';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { ChatProvider } from "../../providers/chat/chat";
import{ ChatPage} from '../chat/chat';
import 'rxjs/add/operator/map';


/**
 * Generated class for the ChatlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-chatlist',
  templateUrl: 'chatlist.html',
})
export class ChatlistPage {

  chatList: any;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
    private chat: ChatProvider
     ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatlistPage');

    //load chat list from database
    this.chat.listPersons().subscribe(data=>{
      let user_id = JSON.parse(localStorage.getItem('server_response'))['server_response']['id'];
      this.chatList = data.filter(user=>{return user.id != user_id});
    });
  }

Chat(user){
  this.navCtrl.push(ChatPage,{user});
}

}
