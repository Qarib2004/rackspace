export interface IAddDeviceForm {
    inventory: number;
    serialNumber: number;
    brand: string;
    model: string;
    deviceType: string;
    unitCount : number;
    room : number;
    company : string;
    confirm : boolean;
}