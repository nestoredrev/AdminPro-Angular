import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {


  /*
    La idea de los servicios ayudar a los desarrolladores dejar lo mas simples los 
    componentes a primera vista.
  */ 

  constructor(private settingService: SettingsService) { }

  ngOnInit() {
    this.settingService.checkCurrentTheme();
  }

  changeTheme( tema:string )
  {
    this.settingService.changeTheme(tema);
  }



}
