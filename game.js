var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

canvas.width = window.innerWidth - 100
canvas.height = 300

var catImg = new Image()
var birdImg = new Image()
catImg.src = 'img/cat.png'
birdImg.src = 'img/bird.png'

var cat =
{
  x:10,
  y:200,
  width:100,
  height:100,
  draw(){
    if(jump_flas == true){
      ctx.drawImage(catImg,25,55,175,155,this.x,this.y,this.width,this.height)
    }else if(timer % 36 < 6){
      ctx.drawImage(catImg,25,55,175,155,this.x,this.y,this.width,this.height)
    }else if(timer % 36 < 12){
      ctx.drawImage(catImg,210,55,175,155,this.x,this.y,this.width,this.height)
    }else if(timer % 36 < 18){
      ctx.drawImage(catImg,400,55,175,155,this.x,this.y,this.width,this.height)
    }else if(timer % 36 < 24){
      ctx.drawImage(catImg,25,250,175,155,this.x,this.y,this.width,this.height)
    }else if(timer % 36 < 30){
      ctx.drawImage(catImg,200,250,175,155,this.x,this.y,this.width,this.height)
    }else if(timer % 36 < 36){
      ctx.drawImage(catImg,400,250,175,155,this.x,this.y,this.width,this.height)
    }
  }
}


class Bird{
  constructor(){
    this.x = canvas.width;
    this.y = 200;
    this.width = 100;
    this.height = 100;
  }
  draw(){
    ctx.fillstyle = 'orange'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }  
}

function perform(){
  animation = requestAnimationFrame(perform)    //모니터의 프레임에 맞게 갱신
  //처음에는 캔버스(*그림판)을 모두 지운다
  timer += 1
  ctx.clearRect(0,0, canvas.width, canvas.height)

  cat.draw()
}
perform()
  

var jump_flag = false
var jum_timer = 0

document.addEventListener('keydown', (e)=>{
  if(e.code === 'Space'){
    if(cat.y === 200){
      jump_flag = true
    }
  }
})

