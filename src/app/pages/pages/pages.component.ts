import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

/*
Declarar la funcion global para TypeScript
*/
declare function customInitFunctiones();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {


  constructor(private settingService: SettingsService) { }

  ngOnInit() {
    customInitFunctiones();
  }

}
