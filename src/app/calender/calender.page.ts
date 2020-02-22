import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AlertController } from '@ionic/angular';
import { LoaderService } from '../services/loader.service';
import State from '../interfaces/state';
import { toEngDate, createDate } from '../common/rabbit';

@Component({
    selector: 'app-calender',
    templateUrl: './calender.page.html',
    styleUrls: ['./calender.page.scss']
})
export class CalenderPage implements OnInit {
    public data: State[] = [];
    public statesStr = ['', 'تلقيح', 'جس', 'ولادة'];

    constructor(
        private db: DatabaseService,
        private alertCtrl: AlertController,
        public loader: LoaderService
    ) {}

    ngOnInit() {
        this.loadData();
    }

    async loadData() {
        this.loader.show();
        let states = (await this.db.get('states')) as State[];

        // TODO load only states with upcoming date
        states = states.filter(x => x.date !== 'noDate' && x.state !== 4);
        this.data = states;

        console.log(states);

        this.loader.hide();
    }

    turnTODate(d: string) {
        return createDate(
            toEngDate(d, true) as string,
            undefined,
            'dddd DD MMMM(MM) YYYY'
        );
    }
}
