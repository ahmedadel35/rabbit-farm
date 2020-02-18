/**
 * state == 0 ===> free
 * state == 1 ===> talqeh
 * state == 2 ===> gas
 * state == 3 ===> welada
 * state == 4 ===> fetam || talqeh with child
 * state == 5 ===> gas with child
 *
 * @export
 * @interface State
 */
export default interface State {
    state: number | 0 | 1 | 2 | 3 | 4| 5;
    positive: boolean;
    num: number;
    maleNo?: number;
    date: string;
    child?: {
        alive: number;
        dead: number;
    };
    notes?: string;
    done?: boolean;
    toDate?: string;
}