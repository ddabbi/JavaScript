var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

canvas.width = window.innerWidth - 100
canvas.height = 300

var catImg = new Image()
var birdImg = new Image()
catImg.src = 'img/cat.png'
birdImg.src = 'img/bird.png'

// 캐릭터 객체(1)
var cat = 
{
  x:10,       // 가로위치
  y:200,      // 세로위치
  width:100,        // 가로크기
  height:100,       // 세로크기
  draw(){
    if(jump_flag == true){
      ctx.drawImage(catImg, 25, 55, 175, 155, this.x, this.y, this.width, this.height)
    }
    else if(timer % 36 < 6){
      // 0 ~ 5
      ctx.drawImage(catImg, 25, 55, 175, 155, this.x, this.y, this.width, this.height)
    }
    else if(timer % 36 < 12){
      ctx.drawImage(catImg, 210, 55, 175, 155, this.x, this.y, this.width, this.height)
    }
    else if(timer % 36 < 18){
      ctx.drawImage(catImg, 400, 55, 175, 155, this.x, this.y, this.width, this.height)
    }
    else if(timer % 36 < 24){
      ctx.drawImage(catImg, 25, 250, 175, 155, this.x, this.y, this.width, this.height)
    }
    else if(timer % 36 < 30){
      ctx.drawImage(catImg, 210, 250, 175, 155, this.x, this.y, this.width, this.height)
    }
    else if(timer % 36 < 36){
      ctx.drawImage(catImg, 400, 250, 175, 155, this.x, this.y, this.width, this.height)
    }
  }
}

// 적군 클래스(여러개)
class Bird
{
  constructor(){
    this.x = canvas.width - 100;
    this.y = 200;
    this.width = 100;
    this.height = 100
  }
  // 화면에 그리기
  draw(){
    ctx.drawImage(birdImg, 450, 80, 130, 100, this.x, this.y, this.width, this.height)
  }
}

var timer = 0
var birdList = []
var animation;
var regen = 1
var last_time = 0

function perform()
{
  animation = requestAnimationFrame(perform)      // 모니터의 프레임에 맞게 갱신
  // 처음에는 캔버스(그림판)을 모두 지운다
  timer += 1
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if(timer % (regen+150) == 0 && last_time + 100 < timer)
  {
    // 새를 생성
    var bird = new Bird()       // 새를 찍어낸다
    birdList.push(bird)
    last_time = timer
    regen = Math.floor(Math.random() * 100)
  }
  
  birdList.forEach((bird, idx, obj)=>{
    if(bird.x < 0){
      // 해당 bird 제거
      obj.splice(idx, 1)
    }

    // 새의 이동속도
    bird.x -= 3

    // collision 함수를 하나 만들어서 고양이 위치와 bird의 위치를 비교해서 x값과 y값이 곂치면 alert('충돌')
    collision(cat, bird);

    bird.draw()
  })

  if(jump_flag == true)
  {
    cat.y -= 4
    jump_timer += 4
  }

  if(jump_flag == false){
      if(cat.y < 200)     // 원래 위치로 복귀하면 중지
      {
        cat.y += 4
      }
  }

  if(jump_timer > 150)
  {
    jump_timer = 0
    jump_flag = false
  }

  // 고양이 그린다
  cat.draw()
}

var jump_flag = false
var jump_timer = 0
// keydown : 키보드 입력
document.addEventListener('keydown', (e)=>{
  // 스페이스가 눌렸는지 검사한다
  // 고양이의 위치가 기본위치일때만 jump_flag를 true시킨다
  if(e.code === 'Space'){
    if(isGameRunning == true){
      if(cat.y === 200)       // 기본위치일때만 점프
      {
        jump_flag = true
      }
    }else{
      startGame()
    }
  }
})

// 충돌이 일어났는지 검사
function collision(고양이, 새)
{
  // 새의 x위치가 고양이의 x 위치보다 작아지고 + 보정
  // 새의 y위치가 고양이의 y 위치보다 작으면 + 보정
  if(새.x < 고양이.x + 고양이.width/2 && 새.y < 고양이.y + 고양이.height/2){
    // 게임오버 ==> 애니메이션을 중단
    cancelAnimationFrame(animation)
    isGameRunning = false       // 게임이 종료됨
    alert('게임 오버')
  }
}
var isGameRunning = false         // 게임이 실행중인가?
function startGame()
{
  // 재시작할 때 초기화해줘야하는 부분을 처리 (처음설정으로)
  jump_flag = false
  jump_timer = 0
  birdList = []
  isGameRunning = true          // 게임이 시작됨
  perform()
}

startGame()