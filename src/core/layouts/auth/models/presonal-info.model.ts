export default class PersonalInfoModel {
    public id: number | null = null;
    public zone: { name: string, parentZone: string }[] | null = null;
    public entryDate: string | null = null;
    public exitDate: string | null = null;
    public applicant: string | null = null;
    public items: string | null = null;
    public name: string | null = null;
    public surname: string | null = null;
    public patronymic: string | null = null;
    public photo: string | null = null;
    public access: string | null = null;

    constructor(item: any) {
        this._setId(item);
        this._setName(item);
        this._setSurname(item);
        this._setPatronymic(item);
        this._setAccess(item);
        this._setZone(item);
        this._setEntryDate(item);
        this._setExitDate(item);
        this._setApplicant(item);
        this._setPhoto(item);
        this._setExitDate(item);
    }

    /**
     * set id
     * @param id
     * @private
     */
    private _setId({id,}: any) {
        this.id = id;
    }

    /**
     * set name
     * @param name
     * @private
     */
    private _setName({name,}: any) {
        this.name = name;
    }

    /**
     * set surname
     * @param surname
     * @private
     */
    private _setSurname({surname,}: any) {
        this.surname = surname;
    }

    /**
     * set patronymic
     * @param patronymic
     * @private
     */
    private _setPatronymic({patronymic,}: any) {
        this.patronymic = patronymic;
    }

    /**
     * set access
     * @param access
     * @private
     */
    private _setAccess({hasAccess,}: any) {
        this.access = hasAccess;
    }


    /**
     * set zone
     * @param zone
     * @private
     */
    private _setZone({zone}: any) {
        this.zone = zone;
    }


    /**
     * set entryDate
     * @param entryDate
     * @private
     */
    private _setEntryDate({entryDate}: any) {
        this.entryDate = entryDate;
    }

    /**
     * set exitDate
     * @param exitDate
     * @private
     */
    private _setExitDate({exitDate}: any) {
        this.exitDate = exitDate;
    }

    /**
     * set applicant
     * @param applicant
     * @private
     */
    private _setApplicant({applicant}: any) {
        this.applicant = applicant;
    }

    /**
     * set photo
     * @param photo
     * @private
     */
    private _setPhoto({photo}: any) {
        this.photo = photo;
    }
}
