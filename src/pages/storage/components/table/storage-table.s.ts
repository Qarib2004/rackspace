export interface ITableType {
    inventory: number;
    serialNumber: number;
    brand: string;
    model: string;
    deviceType: string;
    unitCount : number;
    room : number;
}

export type ButtonActions = 'move' | 'delete' | 'edit';