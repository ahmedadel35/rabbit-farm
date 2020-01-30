import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoaderService } from '../services/loader.service';

@Component({
    selector: 'app-add-new',
    templateUrl: './add-new.page.html',
    styleUrls: ['./add-new.page.scss']
})
export class AddNewPage implements OnInit {
    pageId = 'females';
    title = 'إنثى جديدة';
    showData = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private db: DatabaseService,
        private loader: LoaderService
    ) {}

    ngOnInit() {
        if (!this.router.getCurrentNavigation().extras.state) {
            this.router.navigate(['females']);
        } else {
            // get page name and id from state
            this.title = this.router.getCurrentNavigation().extras.state.page.title;
            this.pageId = this.router.getCurrentNavigation().extras.state.page.id;
            this.showData = this.router.getCurrentNavigation().extras.state.page.showData;

            console.log(this.router.getCurrentNavigation().extras.state.page);
        }
    }
}
