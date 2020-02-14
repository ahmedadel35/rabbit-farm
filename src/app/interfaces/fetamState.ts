export default interface FetamState {
    patchNo: number;
    src: string | 'sell' | 'death' | 'vaccine';
    str: string;
    count?: number;
    weight?: number;
    value?: number;
    notes?: string;
    date: string;
}