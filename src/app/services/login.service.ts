import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,
  private router: Router) { }

  isActiveSession() {
    const isActiveSession = this.storage.get('isActiveSession');

    if (!isActiveSession) {
      this.router.navigate(['/']);
    }
  }

}
