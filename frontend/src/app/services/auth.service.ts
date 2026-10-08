import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService, PhpData } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private messageService = inject(MessageService);
  is_authenticated = false;
  constructor(){
    console.log("AuthService created");
  }

  sendAuthentication(login: string, password: string): Observable<PhpData> {
    return new Observable<PhpData>((subscriber) => {
      this.messageService.sendMessage('checkLogin', {
        login: login,
        password: password
      })
      .subscribe((res: PhpData) => {
        this.is_authenticated = (res.status === 'ok');
        subscriber.next(res);
        subscriber.complete();
      });
    });
  }
}