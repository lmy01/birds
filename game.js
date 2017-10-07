/*
需求：作用：场控 导演 准备游戏所有道具，控制游戏流程
属性：
  所有的游戏对象
  画布（舞台）
  定时器 秒表
  所有的游戏素材（图片）
方法：
  加载图片资源
  游戏对象渲染
  开始游戏
  碰撞检测
  用户控制
  结束游戏
*/
(function (window) {
  function Game(option) {
    this.cv = option.cv;
    //因为对象过多，所以这里用数组保存所有对象
    this.roles = [];
    //所有图片的名字，方便创建对象的时候循环使用
    this.imgArr = ['birds', 'land', 'sky', 'pipe1', 'pipe2'];
    //定时器控制游戏的运作
    this.timer = null;
    //小鸟，因为用户要控制所以单个设置一个属性，方便操作
    this.hero = null;
    //小鸟运动的时候要传入时间差
    this.startTime = new Date();
    this.endTime = 0;
    this.dTime = 0;

  }

  Game.prototype = {
    constructor: Game,
    start: function () {
      //先把this保存下来，因为等会下面要用到定时器
      var that = this;
      //当图片加载完成后执行下面的代码
      this.loadImg(function (imgList) {
        that.initGame(imgList);//图片加载完成后，初始化游戏对象，写在回调函数里
        that.userControl(); //加载用户控制方法
        that.timer = setInterval(function () {
          //获取时间得到时间差
          that.endTime = new Date();
          that.dTime = that.endTime - that.startTime;
          that.startTime = that.endTime;
          //清除画布
          that.cv.clearRect(0,0,that.cv.canvas.width,that.cv.canvas.height);
          //开辟新路径
          that.cv.beginPath();
          //不停渲染
          that.render(that.dTime);
          //不停检测是否碰撞
          that.impact();


        },30)
      })

    },
    //先加载图片，在创建游戏中所用到的对象，顺序不可以颠倒
    loadImg: function (callback) {
      var imgList = {};
      var count = 0; //用于判断图片是否都加载完成
      for (var i = 0; i < this.imgArr.length; i++) {
        var that = this;
        var img = new Image();
        img.src = "imgs/" + this.imgArr[i] + ".png";
        imgList[this.imgArr[i]] = img;//将创建的img对象存在一个数组里
        img.onload = function () {
          count++;
          if (count >= that.imgArr.length) {
            callback && callback(imgList); //回调函数：将imgList当作参数传给后面
          }
        }
      }
    },
    //初始化游戏对象
    initGame: function (imgList) {
      //天空*3
      for (var i = 0; i < 3; i++) {
        var sky = new Game.Sky({
          cv: this.cv,
          img: imgList["sky"],
          index: i
        });
        this.roles.push(sky);
      }

      //柱子*5
      for (var i = 0; i < 5; i++) {
        var pipe = new Game.Pipe({
          cv: this.cv,
          upImg: imgList["pipe2"],
          downImg: imgList["pipe1"],
          index: i
        });
        this.roles.push(pipe);
      }

      //陆地*4
      for (var i = 0; i < 4; i++) {
        var land = new Game.Land({
          cv: this.cv,
          img: imgList["land"],
          index: i
        });
        this.roles.push(land);
      }

      //小鸟
        var bird = new Game.Bird({
          cv: this.cv,
          img: imgList["birds"],
        });
        this.roles.push(bird);
        this.hero = bird;

    },

    //渲染游戏对象
    render:function (dTime) {
      for (var i = 0; i < this.roles.length; i++) {
        this.roles[i].render(dTime);//调用自身的渲染方法
      }
    },
    
    //碰撞检测
    impact:function () {
      if (this.cv.isPointInPath(this.hero.x,this.hero.y)||this.hero.y<0||this.hero.y>this.cv.canvas.height-112) {
        clearInterval(this.timer);
        //调用结束游戏方法
        this.over();
      }
    },

    //用户控制
    userControl:function () {
      var that = this;
      window.onclick = function () {
        that.hero.speed = -0.3;
      }
    },

    //结束游戏
    over:function () {
      alert("呵呵！小鸟 shi 了！");
    }

  }


  window.Game = Game;
})(window)




