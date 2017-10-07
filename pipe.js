

(function (Game) {
  function Pipe(option) {
    this.cv = option.cv;
    this.upImg = option.upImg;
    this.downImg = option.downImg;
    this.width = this.upImg.width;
    this.height= 0;
    this.index = option.index||0;
    this.spaceX = 200;
    this.spaceY = 150;
    this.x = (this.index+1)*this.spaceX;
    this.y = 0;

    this.setPos();

  }

  Pipe.prototype.render = function () {
    this.x-=6;
    if (this.x<-this.spaceX) {
      this.x=4*this.spaceX;
      this.setPos();
    }
    //画上面的管子
    var sy = this.upImg.height-this.y;
    this.cv.drawImage(this.upImg,0,sy,this.width,this.y,this.x,0,this.width,this.y);

    //画下面的管子
    var dy = this.cv.canvas.height-this.y-this.spaceY;
    this.cv.drawImage(this.downImg,0,0,this.width,dy,this.x,this.y+this.spaceY,this.width,dy);

    //绘制路径用于做碰撞检测
    this.cv.rect(this.x,0,this.width,this.y);
    this.cv.rect(this.x,this.y+this.spaceY,this.width,dy);
  }

  //随机生成上面管子的长度
  Pipe.prototype.setPos = function () {
    this.y=100+parseInt(Math.random()*100);//取取100-200
  }


  Game.Pipe = Pipe;
})(Game)




