export default class AccessQrModel {
    public id: number | null = null;
    public name: string | null = null;
    public surname: string | null = null;
    public patronymic: string | null = null;
    public access: boolean | null = null;
    constructor(item: any) {
        this._setId(item);
        this._setName(item);
        this._setSurname(item);
        this._setPatronymic(item);
        this._setAccess(item);
    }

    /**
     * set id
     * @param id
     * @private
     */
    private _setId({ id, }: any) {
        this.id = id;
    }

    /**
     * set name
     * @param name
     * @private
     */
    private _setName({ name, }: any) {
        this.name = name;
    }

    /**
 * set surname
 * @param surname
 * @private
 */
    private _setSurname({ surname, }: any) {
        this.surname = surname;
    }

    /**
* set patronymic
* @param patronymic
* @private
*/
    private _setPatronymic({ patronymic, }: any) {
        this.patronymic = patronymic;
    }

        /**
* set access
* @param access
* @private
*/
private _setAccess({ hasAccess, }: any) {
    this.access = hasAccess;
}


}
