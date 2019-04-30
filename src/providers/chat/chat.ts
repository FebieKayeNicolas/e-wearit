import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs/Observable';
declare const Pusher: any;

@Injectable()
export class ChatProvider {
  pusher: any;
  channel: any;
  constructor(private http: HttpClient) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: false
    });
    this.channel = this.pusher.subscribe('my-channel');
  }

  private apiUrl = "http://localhost/ewearit/api/";

  like( num_likes ) {
    this.http.post('http://localhost:3120/update', {'likes': num_likes})
    .subscribe(data => {});
  }

  sendChat(message,friend_id,user_id){
    let form = new FormData();
    form.append('sender',user_id);
    form.append('receiver',friend_id);
    form.append('message',message);
    return this.http.post(this.apiUrl+'sendChat.php',form);
  }

  getChat(user_id,friend_id){
    return this.http.get(this.apiUrl+'fetchchat.php?user='+user_id+'&friend='+friend_id);
  }

  listPersons(user_id):Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+'chatlist.php?user='+user_id);
  }

  // message(message: string){
  //   this.http.get('http://localhost/ewearit/api/chatlive.php?message='+message).subscribe(data=> {});
  // }

}
