import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.page.html',
  styleUrls: ['./add-state.page.scss'],
})
export class AddStatePage implements OnInit {
  state = 1;
  positive = true;
  date: string;

  constructor() { }

  ngOnInit() {
    this.date = (new Date()).toDateString();
  }

  setState(v: number) {
    this.state = v;
  }

  setPositive(v: number): void {
    this.positive = !!parseInt(v);
  }

}
