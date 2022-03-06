import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  template: `
  <app-navbar></app-navbar>
  `,
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
