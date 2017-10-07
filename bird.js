//需求：
//属性：大小，位置
//方法：渲染 移动

(function (Game) {

  function Bird(option) {
    this.cv = option.cv; //画布
    this.img = option.img; //图片
    this.width = this.img.width/3;
    this.height = this.img.height;
    this.x = 70;
    this.y = 150;
    this.index = 0;


    //加速运动参数
    this.a = 0.0005;
    this.speed = 0;
    this.angle = 0;
    this.maxSpeed = 0.5;  //运动的最大速度
    this.maxAngle = 45;  //旋转的最大角度

  }

  Bird.prototype.render = function (dTime) {

    this.speed = this.speed+this.a*dTime;//当前速度
    if (this.speed>this.maxSpeed) {
      this.speed=this.maxSpeed;
    }
    this.y = this.y+this.speed*dTime+1/2*(this.a*dTime*dTime); //当前小鸟的新的y坐标

    //鸟头旋转
    this.angle = this.speed/this.maxSpeed*this.maxAngle;
    this.cv.save();//保存画布
    this.cv.translate(this.x,this.y);
    this.cv.rotate(this.angle*Math.PI/180);

    this.cv.drawImage(this.img,this.index*this.width,0,this.width,this.height,-this.width/2,-this.height/2,this.width,this.height);

    this.cv.restore();//恢复画布
    this.index++;
    this.index%=3;
  }


  Game.Bird = Bird;
})(Game)