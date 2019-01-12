var Test4Layer = cc.Layer.extend({
    bird:null,
    bullet: null,
    ctor:function () {
        this._super();

        var bg = new cc.Sprite(res.Bg_png);
        bg.attr({x:cc.winSize.width/2, y:cc.winSize.height/2});
        this.addChild(bg);

        this.bullet = new cc.Sprite(res.Bullet_png);
        this.bullet.attr({x:cc.winSize.width/2, y:32});
        this.addChild(this.bullet);

        var fort = new cc.Sprite(res.Fort_png);
        fort.attr({x:cc.winSize.width/2, y:32});
        this.addChild(fort);

        var labelTTF = new cc.LabelTTF("射鳥遊戲", "", 40, cc.size(200,50));
        labelTTF.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height-50));
        this.addChild(labelTTF);

        var score = new cc.LabelAtlas("14774", res.Number_png, 22,24, "0");
        score.setPosition(cc.p(100, cc.winSize.height-50));
        this.addChild(score);


        this.schedule(this.myTask, 3, cc.RepeatForever, 1, 1);
        this.schedule(this.detectShot,0.1, cc.RepeatForever, 0, 1);

        this.myListener();

        return true;
    },

    myTask: function(){
        this.newBird();
    },


    detectShot: function(){
        if (this.bird == null) return;

        var birdRect = new cc.Rect(
            this.bird.x - this.bird.width/2,
            this.bird.y - this.bird.height/2,
            this.bird.width,
            this.bird.height
        );

        var bulletPoint = new cc.Point(
            this.bullet.x, this.bullet.y
        );

        if (cc.rectContainsPoint(birdRect, bulletPoint)){
            this.removeChild(this.bird);
        }else if (this.bird.x-this.bird.width/2 >= cc.winSize.width){
            this.removeChild(this.bird);
        }

    },

    myListener: function(){
        if ('mouse' in cc.sys.capabilities){
            var listener = {
                event: cc.EventListener.MOUSE,
                onMouseDown: function (e) {
                    var mx = e.getLocationX(), my = e.getLocationY();
                    var layer = e.getCurrentTarget();
                    layer.shotBullet(mx, my);
                }
            };
            cc.eventManager.addListener(listener, this);
        }
    },

    shotBullet: function(tx, ty){
        this.bullet.attr({x:cc.winSize.width/2, y:32});
        this.bullet.runAction(cc.moveTo(0.5, tx, ty));
    },


    newBird: function () {
        var rdy1 = parseInt(Math.random()*200);
        var rdy2 = parseInt(Math.random()*200);
        var rdy3 = parseInt(Math.random()*200);
        this.bird = new cc.Sprite(res.Bird_png);
        this.bird.attr({
            x: 0-this.bird.width/2,
            y: 200+rdy1
        });
        this.addChild(this.bird);
        var bezier = [
            cc.p(0-this.bird.width/2, 200+rdy1),
            cc.p(cc.winSize.width/2, cc.winSize.height + 200 + rdy2),
            cc.p(cc.winSize.width+this.bird.width/2, 200 + rdy3)
        ];
        var act = cc.bezierTo(2, bezier);
        this.bird.runAction(act);
    },


});

var Test4Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test4Layer();
        this.addChild(layer);
    }
});

