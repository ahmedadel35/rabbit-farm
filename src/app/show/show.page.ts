import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import Rabbit from '../interfaces/rabbit';

@Component({
    selector: 'app-show',
    templateUrl: './show.page.html',
    styleUrls: ['./show.page.scss']
})
export class ShowPage implements OnInit {
    rabbit: Rabbit;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private db: DatabaseService
    ) {}

    ngOnInit() {
        if (!this.router.getCurrentNavigation().extras.state) {
            this.router.navigate(['females']);
        } else {
            // get page name and id from state
            this.rabbit = this.router.getCurrentNavigation().extras.state.obj;

            console.log(this.router.getCurrentNavigation().extras.state.obj);
        }
    }
}
