import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { FirebaseService } from './service/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'firebase-web-client';
  notifications:any[] = [];

  constructor(private fireBaseService : FirebaseService , private firebase : AngularFireMessaging) {

  }
  ngOnInit(): void {
    this.fireBaseService.requestPermission();
    this.fireBaseService.receiveMessage();
    this.fireBaseService.currentMessage.subscribe(payload => {
      if(payload) {
        this.notifications.push(payload);
      }
    })

  
  }
  remove(index:number)
  {
    this.notifications.splice(index , 1);
  }
}
