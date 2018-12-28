import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { DataService } from 'src/app/services/data.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  errorMessage: string;
  webApiUrl: string;

  employees: User[] = [];

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,
  private dataService: DataService, private configService: ConfigService, private router: Router) {

    this.configService.getConfig().subscribe(config => {
      this.webApiUrl = config['webApiUrl'];
    });
  }

  ngOnInit() {
    this.user = new User('', '');
    this.errorMessage = '';
  }

  login(user: User) {

    this.dataService.getEmployees(this.webApiUrl)
    .subscribe(employees => {
      employees['value'].forEach((p) => this.employees.push(
          new User(p['FirstName'], p['LastName'])
        )
      );

      const index = this.employees.findIndex(empl => empl.username === user.username && empl.password === user.password);

      if (index !== -1) {
        this.storage.set('isActiveSession', true);
        this.router.navigate(['/catalog']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }

    });


  }

}
