import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-found',
  templateUrl: './no-found.component.html',
  styleUrls: ['./no-found.component.css']
})
export class NoFoundComponent implements OnInit {

  year = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
