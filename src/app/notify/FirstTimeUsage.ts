import { DatabaseService } from '../services/database.service';
import Config from '../interfaces/Config';
import Funds from '../interfaces/funds';
import Rabbit from '../interfaces/rabbit';
import State from '../interfaces/state';
import Ill from '../interfaces/ill';

export const FirstTimeKey = 'first_time_use';

export class FirstTimeUsage {
    private db: DatabaseService;

    constructor(db: DatabaseService) {
        this.db = db;
    }

    public run() {
        this.createConfigTB();
        this.createFundsTB();
        this.createFemaelsTB();
        this.createStatesTB();
        this.createIllTB();
        this.db.set(FirstTimeKey, true);
    }

    private createConfigTB() {
        const config: Config = {
            gas: 14,
            BeatElWoelda: 25,
            talqeh: 6,
            fetam: 14,
            hamlMotaqa: 30
        };

        this.db.set('config', config);
    }

    private createFundsTB() {
        const funds: Array<Funds> = [
            {
                src: 1,
                type: '',
                seller: '',
                value: 0,
                weight: 0,
                date: 'noDate'
            }
            // ,{
            //     type: 'outcome',
            //     value: 0,
            //     info: '',
            //     date: 'noDate'
            // },
            // {
            //     type: 'fetam',
            //     value: 0,
            //     info: '',
            //     date: 'noDate'
            // }
        ];

        this.db.set('funds', funds);
    }

    private createFemaelsTB() {
        const rabbit: Array<Rabbit> = [
            {
                num: 0,
                type: 'noType',
                date: 'noDate'
            }
        ];

        this.db.set('females', rabbit);
        this.db.set('males', rabbit);
        this.db.set('archive', rabbit);
    }

    private createStatesTB() {
        const state: Array<State> = [
            {
                // 1=>talqeh || 2=>gas || 3=>welada || 4=>fetam
                state: 0,
                positive: false,
                num: 0,
                date: 'noDate',
            }
        ];

        this.db.set('states', state);
    }

    private createIllTB() {
        const ill: Ill[] = [
            {
                num: 0,
                type: '',
                date: 'noDate',
                healed: false
            }
        ];

        this.db.set('ill', ill);
    }
}
