import { DatabaseService } from '../services/database.service';
import { Config } from '../interfaces/Config';

export default class FirstTimeUsage {
    constructor(private db: DatabaseService) {}

    run() {
        this.createConfigTB();
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
}
