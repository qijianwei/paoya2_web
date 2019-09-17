import Navigator from "../../core/navigator/Navigator";
/**
 * 游戏启动时的加载页面
 */
export default class LaunchScreenView extends Laya.View {
    static ins: LaunchScreenView

    private _imgProgress: Laya.Image
    private _imgProgressMask: Laya.Sprite
    private _lblProgress: Laya.Label
    private _progressView:Laya.Image
    private _progress: number
    constructor() {
        super()
        this.setup()
        Laya.updateTimer.frameLoop(1,this,this.onUpdate);
    }
    setup() {
        this.size(640,1136)
        let box = new Laya.Box()
        box.size(640,1136)
        box.cacheAs = 'normal'
        this.addChild(box)
       
        let spriteBg=new Laya.Sprite()
        spriteBg.graphics.drawRect(0,0,640,1136,"#ffffff");
        spriteBg.alpha=0.5;
        box.addChild(spriteBg)

        
        let progressView=new Laya.Image('local/common/loading.png');
        progressView.pivot(50,50);
        progressView.pos(320,463);
        progressView.size(100,100);
        this._progressView=progressView;
        box.addChild(progressView);


        let lblProgress = new Laya.Label('0%')
        lblProgress.color = '#ffffff'
        lblProgress.fontSize = 25
        lblProgress.centerX = 0
        lblProgress.y = 509
        box.addChild(lblProgress)
        this._lblProgress = lblProgress
    }
   
    onUpdate(){
        this._progressView.rotation+=5;
    }
    static setProgress(progress) {
        if(!this.ins)return
        this.setTips(`${Math.ceil(progress * 100)}%`)
    }

    static setTips(tip) {
        this.ins._lblProgress.text = tip
    }

    static show() {
        let view = new LaunchScreenView()
        Navigator.adjustViewPosition(view)
        view.zOrder = 999
        Laya.stage.addChild(view)
        this.ins = view
    }
    static hide() {
        Laya.updateTimer.clearAll(this.ins);
        if (this.ins) {
            this.ins.destroy()
        }
    }
}