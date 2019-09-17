export default class Dialog extends Laya.Dialog {
    constructor() {
        super()
        this.createJSONView()
    }
    createJSONView() {
        let json = this.constructor['JSONView']
        json && this.createView(json)
    }
    _onAdded(){
        super._onAdded()
        this.onAdded()
    }
    onAdded(){

    }
    _onRemoved(){
        super._onRemoved()
        this.onRemoved()
    }
    onRemoved(){

    }
}