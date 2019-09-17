import Request from '../network/Request'
import PaoYa from '../../paoya'
export default class Component extends Laya.Script {
    private _requests: Array<Request> = []
    private dialogs: Array<Laya.Dialog> = []
    navigator = PaoYa.navigator

    _onEnable() {
        super._onEnable()
        this.owner.addClickListener(this, this.onThrottleClick, true)
    }
    _onViewClick(e: Laya.Event) {
        switch (e.target.name) {
            case 'pop':
                this.navigator.pop()
                break
            case 'popToRoot':
                this.navigator.popToRootScene()
                break
        }
        this.onThrottleClick(e)
    }
    /**有节制的点击，防止用户点击频率过快，默认间隔500ms */
    onThrottleClick(e) {

    }
    _onLoad(){
        this.onLoad()
    }
    onLoad(){

    }
    _onAppear() {
        this.onAppear()
    }
    onAppear() {

    }
    _onDisappear() {
        this.onDisappear()
    }
    onDisappear() {

    }
    _destroy() {
        this.destroyXMR()
        super._destroy()
    }

    _onReceiveMessage(cmd: string, value: any) {
        if (!this.enabled) return
        this.onReceiveMessage(cmd, value)
    }
    _onReceiveSocketError(cmd: string, code: number, message: string) {
        this.onReceiveSocketError(cmd, code, message)
    }
    /**当前 scene 收到服务器 socket 命令时触发，虚方法 */
    onReceiveMessage(cmd: string, value: any) {

    }
    /**当前 scene 收到服务器socket命令错误时触发，虚方法 */
    onReceiveSocketError(cmd: string, code: number, message: string) {
    }
   

    /** ================ Request ================ **/
    GET(path: string, params: object | Function, success: Function, fail: Function) {
        //TODO:
        //1、支持动态参数
        if (params instanceof Function) {
            success = params as Function
            params = {}
            fail = success
        }
        let xmr = Request.GET(path, params, (value) => {
            success.call(this, value)
        }, (msg, code) => {
            fail.call(this, msg, code)
        })
        this._requests.push(xmr)
    }
    POST(path: string, params: object | Function, success: Function, fail: Function) {
        //1、支持动态参数
        if (params instanceof Function) {
            success = params as Function
            params = {}
            fail = success
        }
        let xmr = Request.POST(path, params, (res) => {
            success.call(this, res)
        }, (msg, code) => {
            fail.call(this, msg, code)
        })
        this._requests.push(xmr)
    }
    destroyXMR() {
        for (let i = this._requests.length - 1; i >= 0; i--) {
            let xmr = this._requests.pop();
            if (xmr.http.readyState != XMLHttpRequest.DONE) {
                xmr.http.abort && xmr.http.abort();
            }
        }
    }
  
    popup(dialog: Laya.Dialog) {
        if (dialog instanceof Laya.Dialog) {
            dialog.popup()
            this.dialogs.push(dialog)
        } else {
            console.error('当前popup的不是Dialog实例')
        }
    }
    closeDialogs() {
        for (let i = 0, length = this.dialogs.length; i < length; i++) {
            let dialog = this.dialogs[i]
            dialog.destroy()
        }
    }
    /**点击右上角转发时触发 */
    onShareAppMessage(): object {
        return null
    }
    /**当网络变化时调用 */
    onNetworkChange(e) {

    }
    /**当socket断开时调用 */
    onSocketClose() {

    }
}