//需求：
//属性：大小
//方法：渲染 移动

(function (Game) {
  function Land(option) {
    this.cv = option.cv;
    this.img = option.img;
    this.width = this.img.width;
    this.height = this.img.height;
    this.index = option.index||0;//第几个陆地
    this.x = this.index*this.width;
    this.y = this.cv.canvas.height-this.height;
    this.offsetX=this.x;//x坐标的偏移量

  }
  Land.prototype.render = function () {
    this.offsetX-=5;
    if (this.offsetX<this.x-this.width) {
      this.offsetX=this.x;
    }
    this.cv.drawImage(this.img,0,0,this.width,this.height,this.offsetX,this.y,this.width,this.height)

  }

  Game.Land = Land;
})(Game)