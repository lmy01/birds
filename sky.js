/*
需求：
属性：大小，移动
方法：渲染 移动
*/

(function (Game) {

  function Sky(option) {
    this.cv = option.cv;
    this.img = option.img;
    this.height = this.cv.canvas.height;
    this.width = this.height/this.img.height*this.img.width;
    this.index = option.index;
    this.x = this.index*this.width;
    this.y = 0;
    this.offsetX = this.x;


  }

  Sky.prototype.render = function () {
    this.offsetX-=3;
    if (this.offsetX<this.x-this.width) {
      this.offsetX=this.x;
    }

    this.cv.drawImage(this.img,0,200,this.width,this.height,this.offsetX,this.y,this.cv.canvas.width,this.cv.canvas.height)



  }

  Game.Sky=Sky;

})(Game)






