var Test3Layer = cc.Layer.extend({
    sprite:null,
    act1: null,
    act2:null,
    gridNodeTarget:null,
    ctor:function () {
        this._super();

        this.gridNodeTarget = new cc.NodeGrid();
        this.addChild(this.gridNodeTarget);

        var brad = new cc.Sprite(res.HelloWorld_png);
        brad.attr({
            x: cc.winSize.width*3/4,
            y: cc.winSize.height*3/4
        });
        this.gridNodeTarget.addChild(brad);


        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2
        });
        this.addChild(this.sprite, 0);

        this.initMenu();

        this.scheduleUpdate();

        return true;
    },


    initMenu: function () {
        var test1 = new cc.MenuItemImage(
            res.Button_png, null, null,
            this.test1, this
        );
        test1.attr({x: 1*64, y: 100});

        var test2 = new cc.MenuItemImage(
            res.Button_png, null, null,
            this.test2, this
        );
        test2.attr({x: 2*64, y: 100});

        var test3 = new cc.MenuItemImage(
            res.Button_png, null, null,
            this.test3, this
        );
        test3.attr({x: 3*64, y: 100});

        var test4 = new cc.MenuItemImage(
            res.Button_png, null, null,
            this.test4, this
        );
        test4.attr({x: 4*64, y: 100});

        var test5 = new cc.MenuItemImage(
            res.Button_png, null, null,
            this.test5, this
        );
        test5.attr({x: 5*64, y: 100});

        var test6 = new cc.MenuItemImage(
            res.Button_png, null, null,
            this.test6, this
        );
        test6.attr({x: 6*64, y: 100});

        var test7 = new cc.MenuItemImage(
            res.Button_png, null, null,
            this.test7, this
        );
        test7.attr({x: 7*64, y: 100});

        var test8 = new cc.MenuItemImage(
            res.Button_png, null, null,
            this.test8, this
        );
        test8.attr({x: 8*64, y: 100});

        var menu = new cc.Menu(test1, test2, test3, test4, test5, test6, test7, test8);
        menu.attr({x:0, y:0});
        this.addChild(menu);

    },

    test1: function () {
        this.sprite.runAction(cc.toggleVisibility());
    },

    test2: function () {
        this.act1 = new cc.moveTo(3,
            cc.winSize.width - this.sprite.width/2,
            cc.winSize.height-this.sprite.height/2);
        this.sprite.runAction(this.act1);
    },

    test3: function () {
        this.act2 = new cc.moveTo(3,
            cc.winSize.width/2,
            cc.winSize.height/2);
        this.sprite.runAction(this.act2);
    },

    test4: function () {
        this.sprite.stopAction(this.act1);
    },

    test5: function(){
        var act = new cc.moveBy(1, 10, 10);
        this.sprite.runAction(act);
    },

    test6: function(){
        var act = new cc.jumpTo(5,
            cc.p(cc.winSize.width - this.sprite.width/2,
            cc.winSize.height-this.sprite.height/2),
            40, 10);
        this.sprite.runAction(act);
    },

    test7: function(){
        var bezier = [
            cc.p(this.sprite.x, this.sprite.y),
            cc.p(this.sprite.x+200, this.sprite.y+400),
            cc.p(this.sprite.x+400, this.sprite.y)
        ];
        var act = new cc.bezierTo(3, bezier);
        this.sprite.runAction(act);
    },

    test8: function(){
        this.gridNodeTarget.runAction(cc.flipX3D(3));
    },


    update: function () {
        cc.log(this.sprite.x);
    }


});

var Test3Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test3Layer();
        this.addChild(layer);
    }
});

