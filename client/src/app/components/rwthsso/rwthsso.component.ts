import { Component, OnInit } from '@angular/core';
import { SsoAuthService } from '../../services/ssoauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rwthsso',
  templateUrl: './rwthsso.component.html',
  styleUrls: ['./rwthsso.component.css']
})
export class RwthssoComponent implements OnInit {
device_code
message;
messageClass;
  constructor(private ssoAuthService: SsoAuthService,
    private router: Router) { }
  
  ngOnInit() {
    this.ssoAuthService.getSSOLogin().subscribe(ress => {
      this.device_code = ress.ress.device_code;
      this.message = ress.message;
      setTimeout(() => {
        this.ssoAuthService.getSSOLoginCallBack(this.device_code).subscribe(ress => {
         if(ress.success == true){
          this.message = ress.message;
          this.messageClass = 'alert alert-success';
          this.ssoAuthService.storeUserData(ress.token, ress.user, ress.expireAt);
        //this.ssoAuthService.createAuthenticationHeaders();
        setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
         }else{
          this.messageClass = 'alert alert-danger';
          this.message = ress.message;
         }
        });
      }, 10000);

     });
  
  }

}
