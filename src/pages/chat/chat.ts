import { Component, ViewChild, OnInit  } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { ChatProvider } from "../../providers/chat/chat";
import 'rxjs/add/operator/map';

@Component({

selector: 'page-chat',
templateUrl: 'chat.html'

})

export class ChatPage implements OnInit {
    

@ViewChild("message") message;


params: Object;
friend: any;
messages;
user_id: any;

sender:any;
receiver: any;
time: any;
status: any;

// info: any;

constructor(
  public navCtrl: NavController,
   public alertCtrl: AlertController,  
   private http: Http,  
   public loading: LoadingController,
  private chat: ChatProvider,
  private navParams: NavParams
  ) {
  this.sender="";
  this.receiver="";
  this.time="";
  this.status="";


  this.friend = this.navParams.get('user');
  this.user_id = JSON.parse(localStorage.getItem('server_response'))['server_response']['id'];
}

ngOnInit(){

  
  this.chat.channel.bind('chat', data=> {
    if((data.receiver == this.user_id && data.sender == this.friend.id) 
    || (data.receiver == this.friend.id && data.sender == this.user_id))
    this.messages.push(data);
  });
  this.chat.getChat(this.user_id,this.friend.id).subscribe(data=>{
    this.messages = data;
  });
}

doSend(){

//// check to confirm the username, email, telephone and password fields are filled

if(this.message.value=="" ){

    let alert = this.alertCtrl.create({
    
    title:"ATTENTION",
    
    subTitle:"Message field is empty",
    
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
    
    sender: this.sender,
    receiver: this.receiver,
    time: this.time,
    message: this.message.value,
    status: this.status,
  
    };
    
    let loader = this.loading.create({
    
    content: 'Processing please wait…',
    
    });
    
    loader.present().then(() => {
    
    this.http.post('http://localhost/ewearit/api/chat.php',data, options)
    
    .map(res => res.json())
    
    .subscribe(res => {
    
    loader.dismiss()
    
    if(res=="Sent"){
    
      let alert = this.alertCtrl.create({
      
      title:"SENT",
      
      subTitle:(res),
      
      buttons: ['OK']
      
      });
      
      alert.present();
      
      // this.navCtrl.setRoot(LoginPage);
    
    }
    else {
    
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

  sendChat(chatMessage){
    this.chat.sendChat(chatMessage.value,this.friend.id,this.user_id).subscribe();
    chatMessage.value = "";
  }
  }
