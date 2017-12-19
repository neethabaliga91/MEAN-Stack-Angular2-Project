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
          setTimeout(() => {
            this.router.navigate(['/workflow']);
          }, 2000);
         }
        });
      }, 7200);

     });
  
  }

}
