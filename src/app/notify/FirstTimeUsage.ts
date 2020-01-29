import { DatabaseService } from '../services/database.service';
import Config from '../interfaces/Config';
import Funds from '../interfaces/funds';

export const FirstTimeKey = 'first_time_use';

export class FirstTimeUsage {
    private db: DatabaseService;

    constructor(db: DatabaseService) {
        this.db = db;
    }

    public run() {
        this.createConfigTB();
        this.createFundsTB();
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
                type: 'income',
                value: 0,
                info: '',
                count: 0,
                date: '25 فبراير 2019',
                sum: false
            },
            {
                type: 'outcome',
                value: 0,
                info: '',
                count: 0,
                date: '25 فبراير 2019',
                sum: false
            },
            {
                type: 'fetam',
                value: 0,
                info: '',
                count: 0,
                date: '25 فبراير 2019',
                sum: false
            }
        ];

        this.db.set('funds', funds);
    }
}
