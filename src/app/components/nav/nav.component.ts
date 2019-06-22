import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  links = [
    {
      name: 'Calculation',
      link: 'calc'
    },
    {
      name: 'Add New',
      link: 'create'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
