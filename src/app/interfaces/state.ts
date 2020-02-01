/**
 * state == 1 ===> talqeh
 * state == 2 ===> gas
 * state == 3 ===> welada
 *
 * @export
 * @interface State
 */
export default interface State {
    state: number;
    positive: boolean;
    num: number;
    maleNo?: number;
    date: string;
    child?: {
        alive: number;
        dead: number;
    };
    notes?: string;
}