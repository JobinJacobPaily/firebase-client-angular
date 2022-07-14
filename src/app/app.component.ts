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
  notifications: any[] = [];
  isTopic = false;
  topic: any = null;

  constructor(private fireBaseService: FirebaseService, private firebase: AngularFireMessaging) {

  }
  ngOnInit(): void {

  }
  remove(index: number) {
    this.notifications.splice(index, 1);
  }

  submit() {
    if (this.topic) {
      this.isTopic = true;
      this.fireBaseService.requestPermission(this.topic);
      this.fireBaseService.receiveMessage();
      this.fireBaseService.currentMessage.subscribe(payload => {
        if (payload) {
          this.notifications.push(payload);
        }
      })
    }
  }
}
