export class DateCenterModel {
    public id: number | null = null;
    public name: string | null = null;
    public description: string | null = null;

    constructor(data: any) {
        this._setId(data);
        this._setName(data);
        this._setDescription(data);
    }

    private _setId({id}: any) {
        this.id = id ?? null;
    }

    private _setName({name}: any) {
        this.name = name ?? null;
    }

    private _setDescription({description}: any) {
        this.description = description ?? null;
    }


}
