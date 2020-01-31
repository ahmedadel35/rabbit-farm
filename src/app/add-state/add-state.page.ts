import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';
import Rabbit from '../interfaces/rabbit';

@Component({
    selector: 'app-add-state',
    templateUrl: './add-state.page.html',
    styleUrls: ['./add-state.page.scss']
})
export class AddStatePage implements OnInit {
    state = 1;
    positive = true;
    date: string;
    rabbit: Rabbit;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private db: DatabaseService,
        private loader: LoaderService
    ) {}

    ngOnInit() {
        // set default date to today
        this.date = new Date().toDateString();

        const routerData = this.router.getCurrentNavigation().extras;
        if (!routerData.state || !routerData.state.rb) {
            this.router.navigate(['females']);
        } else {
            // get page name and id from state
            this.rabbit = routerData.state.rb;

            console.log(routerData.state.rb);
        }
    }

    goBack() {
        const d: NavigationExtras = {
            state: {
                obj: this.rabbit
            }
        };

        this.router.navigate(['show'], d);
    }

    setState(v: number) {
        this.state = v;
    }

    setPositive(v: number): void {
        this.positive = !!parseInt(v);
    }
}
