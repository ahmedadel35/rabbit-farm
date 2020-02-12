import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-fetam',
  templateUrl: './add-fetam.page.html',
  styleUrls: ['./add-fetam.page.scss'],
})
export class AddFetamPage implements OnInit {
  // form inputs
  patchNo?: number = null;
  count: number = null;
  weight: number = null;;
  age: number = null;;
  date: string;

  constructor() { }

  ngOnInit() {
    this.date = (new Date()).toDateString()
  }

}
