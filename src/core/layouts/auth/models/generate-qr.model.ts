export default class GenerateQrModel {
    public id: number | null = null;
    public post: string | null = null;
    public qrcode: string | null = null;
    public operationId: string | null = null;
    constructor(item: any) {
        this._setId(item);
        this._setPost(item);
        this._setQrBase64(item);
        this._setOperationId(item);
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
     * set post
     * @param post
     * @private
     */
    private _setPost({ post, }: any) {
        this.post = post;
    }

    /**
 * set qrBase64
 * @param qrBase64
 * @private
 */
    private _setQrBase64({ qrBase64, }: any) {
        this.qrcode = qrBase64;
    }

    /**
* set operationId
* @param operationId
* @private
*/
    private _setOperationId({ operationId, }: any) {
        this.operationId = operationId;
    }


}
