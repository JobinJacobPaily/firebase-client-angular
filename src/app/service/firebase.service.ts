import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  currentMessage = new BehaviorSubject(null);
  accessToken:String = "";
  constructor(private angularFireMessaging: AngularFireMessaging,
              private httpClient: HttpClient) {
                this.angularFireMessaging.messages.subscribe(
                  (_messaging :any) => {
                  });
                
  }
  requestPermission(topic:any) {
  this.angularFireMessaging.requestToken.subscribe(
  (token) => {
  console.log(token);
  },
  (err) => {
  console.error('Unable to get permission to notify.', err);
  }
  );
  this.angularFireMessaging.getToken.subscribe((token:any) => {
    console.log("Access token : ", token);
    this.accessToken = token;
    this.subscribeToTopic(topic) 
  })
  }
   receiveMessage() {
  console.log("hi")
 this.angularFireMessaging.messages.subscribe((message:any) => {
   console.log("hello");
   console.log(message);
   this.currentMessage.next(message.notification);
 })

  } 

  subscribeToTopic(topic:any) {
  const apiKey = "" 
  if(this.accessToken != "") {
      const topicURL = `https://iid.googleapis.com/iid/v1/${this.accessToken}/rel/topics/`;
      const headers = new HttpHeaders({
        'Authorization' : `key=${apiKey}`
      });
      this.httpClient.post(topicURL+ topic,"", {headers}).subscribe(res => {
        console.log("subscribe success");
        console.log(res);
      },err => {
         console.log(err)
      });


    }

  }
}
