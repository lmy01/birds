/*
需求：
先让小鸟动起来
根据加速度让小鸟下落的时候加速，并且头部向下倾斜
点击鼠标，阻止小鸟下落
*/

var canvas = document.querySelector("canvas");
var cv = canvas.getContext('2d');

//设置小鸟帧动画
var bird = new Image();

var i=0;
var startTime = Number(new Date());
var startSpeed = 0;
var jiaSpeed = 0.0005;
var move=0;
var redian = 0;
var maxRedian = 45;
var maxSpeed = 0.5;
var endSpeed = 0;

bird.onload = function () {

  //设置定时器将小鸟动起来
  var timer = setInterval(function () {

    //设置下落效果：求出下落距离
    /*
		Vt当前速度
		Vo 初始速度
		a:加速度
		t:时间差   计时的结束时间-计时的起始时间

		Vt=V0+at

		s=V0*t+1/2a*t*t //t时间段内移动距离
	*/
    var endTime = Number(new Date());
    var time = endTime-startTime;
    move = move + parseInt(endSpeed*time+(1/2*jiaSpeed*time*time)); //距离要累加
    endSpeed = endSpeed+jiaSpeed*time;
    //将小鸟的旋转角度和速度成正比，当达到最大速度的时候，小鸟也旋转角度也达到最大
    if (endSpeed > maxSpeed) {
      endSpeed = maxSpeed;
    }
    redian =  endSpeed/maxSpeed*maxRedian;

    //每次循环，先将画面清空
    cv.clearRect(0,0,canvas.width,canvas.height);

    //随着小鸟下落的过程，将画布的坐标系旋转，最大旋转到45°
    //先把坐标系移到小鸟图片的中点
    cv.save();  //因为平移会叠加，所以要先保存之前的坐标位置，运行完再恢复之前的
    //移动坐标轴，造成小鸟下落的现象
    cv.translate(100,move);
    cv.rotate(redian*Math.PI/180);

    //将图片加入到画布中  52*45  并将小鸟的中点和坐标轴原点重合
    cv.drawImage(bird,i*52,0,52,45,-52/2,-45/2,52,45);
    i++;
    i = i%3;  //i只能取 0  1  2

    //将初始时间重新赋值
    startTime = endTime;

    cv.restore();


  },80)
}

window.onclick = function () {
  //让小鸟跳起来
  endSpeed = -0.3;
}


bird.src = "imgs/birds.png";





