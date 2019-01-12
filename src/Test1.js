var Test1Layer = cc.Layer.extend({
    sprite:null,
    ball: null,
    ctor:function () {
        this._super();

        // this.ball = new cc.Sprite(res.Ball_png);
        // this.ball.x = cc.winSize.width /2;
        // this.ball.y = cc.winSize.height /2;
        // this.ball.dx = 4;
        // this.ball.dy = 4;
        // this.addChild(this.ball);
        //
        // this.ball.schedule(this.ballUpdate, 0.01, cc.RepeatForever, 1);

        this.myMouseListener();

        return true;
    },

    ballUpdate: function () {
        // this is-a ball
        if (this.x - this.width/2 <= 0 ||
            this.x + this.width/2 >= cc.winSize.width){
            this.dx *= -1;

            if (this.dy < 0){
                this.ang += this.dx>0?90:-90;
            }else{
                this.ang -= this.dx>0?90:-90;
            }

            this.runAction(cc.rotateTo(0.5, this.ang));
        }

        if (this.y - this.height/2 <= 0 ||
            this.y + this.height/2 >= cc.winSize.height){
            this.dy *= -1;

            if (this.dx < 0){
                this.ang += this.dy>0?90:-90;
            }else{
                this.ang -= this.dy>0?90:-90;
            }
            this.runAction(cc.rotateTo(0.5, this.ang));

        }

        this.x += this.dx;
        this.y += this.dy;

    },


    myMouseListener: function () {
        if ('mouse' in cc.sys.capabilities){
            var listener = {
                event: cc.EventListener.MOUSE,
                onMouseUp: function (e) {
                    var x = e.getLocationX();
                    var y = e.getLocationY();
                    var layer = e.getCurrentTarget();
                    layer.addNewBall(x, y);
                },
            };
            cc.eventManager.addListener(listener, this);
        }
    },

    addNewBall: function (x, y) {
        cc.log("x = " + x + "; y = " + y);
        var ball = new cc.Sprite(res.Ball_png);
        ball.x = x;
        ball.y = y;
        ball.dx = parseInt(Math.random()*2)==0?4:-4;
        ball.dy = parseInt(Math.random()*2)==0?4:-4;
        ball.ang = 0;
        this.addChild(ball);

        ball.schedule(this.ballUpdate, 0.01, cc.RepeatForever, 0, 1);
    }


});

var Test1Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test1Layer();
        this.addChild(layer);
    }
});

