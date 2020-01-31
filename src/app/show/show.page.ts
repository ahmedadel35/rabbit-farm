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
    title = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private db: DatabaseService
    ) {}

    ngOnInit() {
        const routerData = this.router.getCurrentNavigation().extras;
        if (!routerData.state || !routerData.state.obj) {
            this.router.navigate(['females']);
        } else {
            // get page name and id from state
            this.rabbit = routerData.state.obj;
            this.title += this.rabbit.name ? this.rabbit.name : 'رقم ' + this.rabbit.num;

            console.log(routerData.state.obj);
        }
    }

    addState() {
        const d: NavigationExtras = {
            state: {
                rb: this.rabbit
            }
        };

        this.router.navigate(['add-state'], d);
    }
}
