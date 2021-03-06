var spriteRun1Img = new Image();
spriteRun1Img.src = "./img/run1.png";
var spriteRun2Img = new Image();
spriteRun2Img.src = "./img/run2.png";
var spriteStandImg = new Image();
spriteStandImg.src = "./img/standBasic.png";
var spriteBottomPunchImg = new Image();
spriteBottomPunchImg.src = "./img/punchBasic.png"
var spriteMidPunchImg = new Image();
spriteMidPunchImg.src = "./img/punchJump.png"
var spriteTopPunchImg = new Image();
spriteTopPunchImg.src = "./img/punchFly.png"
var spriteChimpanzee = new Image();
spriteChimpanzee.src = "./img/enemy_1.png";
var spriteBonusChimpanz = new Image();
spriteBonusChimpanz.src = "./img/enemy_2.png";

const chimpenz_id_bonus = 601;
const chimpenz_id_basic = 602;

class gameTimer{
    constructor(time){
        this.time = time; //타이머 시간 설정
        this.startTime = null;
    }
    start(){
        this.startTime = Date.now();
    }
    timeCheck(){
        if(Date.now()-this.startTime <= this.time){
            //지정한 시간 안으로 시간이 지났으면 true
            return true;
        }else{
            return false;
        }
    }
    getTime(){
        return Date.now()-this.startTime; //지난 시간
    }
}

class Chimpanzee {
    //침팬지를 생성하는 클래스
    constructor(x, y, spriteImg, id){
        this.x = x;
        this.y = y;
        this.width = spriteImg.width;
        this.height = spriteImg.height;
        this.spriteImg = spriteImg;
        this.alive = true;
        this.id = id;
        if(id==chimpenz_id_basic){ this.score = 100; }
        else if(id==chimpenz_id_bonus){ this.score = 200; }
    }
    draw(){
        ctx.drawImage(this.spriteImg, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

class sound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.play();
        };
        this.stop = function () {
            this.sound.pause();
        };
    }
}

//html의 요소들을 가져와서 변수에 넣어둠 
let body = document.querySelector("body"); //바디
let mainScreen = document.querySelector(".mainScreen"); //
let gameStartBtn = document.querySelector(".gameStartBtn");
let gameRankBtn = document.querySelector(".gameRankBtn");
let gameRoleBtn = document.querySelector(".gameRoleBtn");
let gameTitle = document.querySelector(".gameTitle");

//태그 생성
let canvas = document.createElement("canvas");
let header = document.createElement("div");
let closeBtn = document.createElement("button");
let timerText = document.createElement("p");
let scoreText = document.createElement("p");
let endScoreDiv = document.createElement("div");
let endScoreText = document.createElement("p");

let roleBoxImg = document.createElement("img");
let roleCloseBtn = document.createElement("button");

roleCloseBtn.style.backgroundImage = 'url("./img/closeBtn.png")'; roleCloseBtn.style.width = '30px'; roleCloseBtn.style.height = '30px';
 roleCloseBtn.style.marginLeft = '1200px'; roleCloseBtn.style.marginTop = '50px';
roleBoxImg.src = "./img/rolebox.png"; roleBoxImg.style.objectFit = 'cover';
roleBoxImg.style.width = '1100px'; roleBoxImg.style.height = '700px'; roleBoxImg.style.marginLeft = '200px';

scoreText.style.display = 'inline-block'; scoreText.style.margin = "10px"; scoreText.textContent = "SCORE : 0";
 scoreText.style.fontSize="25px"; scoreText.style.fontWeight = '900'; scoreText.style.marginLeft = '30px'; scoreText.style.width = '250px';
 scoreText.style.fontFamily = "Neo둥근모 Code", "Neo둥근모Code", "neodgm-code";

endScoreText.style.fontSize="50px"; endScoreText.style.fontWeight = '900'; endScoreText.style.paddingTop = '80px';
endScoreText.style.fontFamily = "Neo둥근모 Code", "Neo둥근모Code", "neodgm-code"; endScoreText.style.textAlign = "center";

endScoreDiv.style.textAlignLast = 'bottom'; endScoreDiv.style.backgroundImage = 'url(./img/scoreBox.png)';
endScoreDiv.style.marginLeft = '450px';  endScoreDiv.style.marginTop = '100px';endScoreDiv.style.height = '150px'; 
endScoreDiv.style.width = '250px';

timerText.style.display = 'inline-block'; timerText.style.margin = "10px"; timerText.textContent = "TIMER : 60";
 timerText.style.fontFamily = "Neo둥근모 Code", "Neo둥근모Code", "neodgm-code";
timerText.style.fontSize="25px"; timerText.style.fontWeight = '900'; timerText.style.marginLeft = '30px'; timerText.style.width = '250px';

header.id = "header"
closeBtn.style.backgroundImage = 'url("./img/closeBtn.png")'; closeBtn.style.width = '30px'; closeBtn.style.height = '30px';
closeBtn.style.margin = '20px'; closeBtn.style.marginLeft = '880px'; 

let mainSound = new sound("./bgm/mainSound.mp3");
let gameBgdSound = new sound("./bgm/gameSound.mp3");
let chimpanzSound = new sound("./bgm/chimpanzeeSound.mp3");
let punchSound = new sound("./bgm/punchSound.mp3");

gameStartBtn.onload = ()=>{
    mainSound.play();
}


//게임 종료 버튼 눌렀을 때
closeBtn.onclick = ()=>{
    gameBgdSound.stop();
    chimpanzees = [];
        wakgood = null;
        gameEnd = true;
        canvas.remove();
        header.remove();
        endScoreDiv.remove();
        endScoreDiv.remove();
        gameEnd = true;
        setTimeout(()=> {
            body.appendChild(mainScreen)
            gameTitle.style.animation = 'origin-padding-top 1s';
            gameStartBtn.style.animation = 'origin-margin-top 1s';
            gameRoleBtn.style.animation = 'origin-margin-left 1s';
            gameRankBtn.style.animation = 'origin-margin-right 1s';
        }, 500);
        
}

gameRoleBtn.onclick = ()=>{
    mainScreen.remove();
    body.appendChild(roleCloseBtn);
    body.appendChild(roleBoxImg);
}

roleCloseBtn.onclick = ()=>{
    roleCloseBtn.remove();
    roleBoxImg.remove();
    setTimeout(()=> {
        body.appendChild(mainScreen)
        gameTitle.style.animation = 'origin-padding-top 1s';
        gameStartBtn.style.animation = 'origin-margin-top 1s';
        gameRoleBtn.style.animation = 'origin-margin-left 1s';
        gameRankBtn.style.animation = 'origin-margin-right 1s';
    }, 500);
}

canvas.id = "gameCanvas";
canvas.width = 1900/4.5;
canvas.height = 1080/4.5;
//게임 시작 버튼 눌렀을때(게임 시작 부분)
gameStartBtn.onclick= function(){
    mainBtnClickEvent();
    setTimeout(()=>mainScreen.remove(), 1800); //버튼들이 사라지는데 2초정도 걸림. 그래서 조금 더 빨리 메인의 버튼들을 모두 없앰.(mainScreen은 메인화면)
    //기다린 후 canvas를 붙여주고 게임을 실행한다.
    setTimeout(()=> {
        body.prepend(canvas);
        gameInit(); //게임에 필요한 것들을 초기화.
        gameRefresh(); //update, render를 반복적으로 실행.
    }, 500);
}
//게임에서 필요한 것들을 선언함.
let lastTime  = Date.now();
let wakgood; //플레이어.
let punch = false;
let lastime = Date.now();
let chimpanzees = [];
let score = 0;
let gameEnd = false;
let timer = new gameTimer(1000*60);

//키 입력 관련 선언
let keyW = false;
let keyS = false;
let keySpace = false;

//애니메이션
var ctx = canvas.getContext('2d');

const run1State = 3000;
const run2State = 3001;
const standBasicState = 3002;
const punchState = 3003;

const bottomPunch = 20;
const midPunch = 40;
const topPunch = 60;

function gameInit(){
    header.append(timerText);
    header.append(scoreText);
    header.append(closeBtn);
    body.prepend(header);

    score = 0;
    timer.start();
    mainSound.stop();
    gameBgdSound.play();
    gameEnd = false;
    sinceLastTime = 0; //시간 체크용
    //플레이어 세팅, 침팬지 세팅, 음악 등등 게임 처음 부분
    wakgood = {
        x : 0,
        y : 130,
        startGame: true,
        width : spriteRun1Img.width,
        height : spriteRun1Img.height,
        state : run1State,
        punch : false,
        punchType: null,
        draw(){
            switch(this.state){
                case run1State: ctx.drawImage(spriteRun1Img, 20, 0, this.width, this.height, this.x, this.y, this.width, this.height); break;
                case run2State: ctx.drawImage(spriteRun2Img,  20, 0, this.width, this.height, this.x, this.y, this.width, this.height); break;
                case standBasicState: ctx.drawImage(spriteStandImg,  20, 0, this.width, this.height, this.x, this.y, this.width, this.height); break;
                case punchState: 
                    switch(this.punchType){
                        case bottomPunch: ctx.drawImage(spriteBottomPunchImg, 20, 0, this.width, this.height, this.x, this.y, this.width, this.height); break;
                        case midPunch: ctx.drawImage(spriteMidPunchImg, 20, 0, this.width, this.height, this.x, this.y, this.width, this.height); break;
                        case topPunch: ctx.drawImage(spriteTopPunchImg, 0, 0, this.width, this.height, this.x-30, this.y, this.width, this.height); break;
                    }
                break;
            }
        },
        update(){
            //달리기부분
            switch(this.state){
                case run1State : this.state = run2State; break;
                case run2State : this.state = run1State; break;
            } 
            console.log("score:"+score);
        },
    }

    chimpanzeeRandLocProduce(80); //침팬지 랜덤 생성 함수
}

function gameRefresh(){
    var now = Date.now(); //현재 시간 체크
    var dt = (now-lastTime); //지난 시간
    gameUpdate(dt); //업데이트
    gameRender(); //그림 그리기
    lastTime = now;
    requestAnimationFrame(function(){
        //계속 실행하는 재귀함수.
        if(!gameEnd){gameRefresh();}
    })
}

var punchTime = 0;
function gameUpdate(dt){
    keyProcess();
    sinceLastTime += dt;
    if(sinceLastTime > 100){
        //0.2초 정도 지날때마다 wakgood update();
        wakgood.update();
        sinceLastTime = 0;
        
        moveChimFront();

        //화면 전환(침팬지 모두 없앰. )
        screenRefresh();
        //if(Math.floor(((1000 * 60) - timer.getTime())/1000) < 60)
        timerText.textContent =  "남은 시간 : "+Math.floor(((1000 * 60) - timer.getTime())/1000); //600 -- 0.6, 6000 -- 6
    }
    
    scoreText.textContent = "스코어 : "+score;

    //침팬지 공격 관련
    if(wakgood.punch == true){
        chimpenzPunch(dt);
    }
    
    //시간 종료
    if(timer.getTime() >= 1000*60){
            gameBgdSound.stop();
            chimpanzees = [];
            wakgood = null;
            gameEnd = true;
            canvas.remove();
            header.remove();
            endScoreText.textContent = ""+score;
            body.append(closeBtn);
            endScoreDiv.append(endScoreText);
            endScoreDiv.append(closeBtn);
            body.append(endScoreDiv);
    }

}

function gameRender(){
    if(!gameEnd){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //모든 스프라이드(이미지) 그려주기.
        wakgood.draw();
        chimpanzees.forEach(element =>element.draw()); //존재하는 침팬지 모두 그리기
    }
}

function screenRefresh(){
    //화면 전환(침팬지 모두 없앰. )
    if(chimpanzees[0]==null){ 
        chimpanzeeRandLocProduce(40);
        wakgood.x = 0;
        wakgood.y = 130;
        wakgood.startGame = true;
        wakgood.state = run1State;
        wakgood.punch = false;
}
}

function chimpenzPunch(dt){
    //펀치를 위한 함수
    if(chimpanzees[0]!=null){
        if(collisionCheck(wakgood.x-5, wakgood.y, chimpanzees[0].x, chimpanzees[0].y)){ //collisionCheck(wakgood.x-5, wakgood.y, chimpanzees[0].x, chimpanzees[0].y)
            if(chimpanzees[0].id == chimpenz_id_basic){ chimpanzees[0].alive = false;}
            if(chimpanzees[0].id == chimpenz_id_bonus && doublePunch){ chimpanzees[0].alive = false; doublePunch = false;}
            wakgood.state=punchState;
            if(!chimpanzees[0].alive){
                chimpanzSound.play();
                score+=chimpanzees[0].score;
                chimpanzees.splice(0, 1); //맨 앞의 한개의 침팬지 삭제'
            }   
        }else if(wakgood.x+10 >= chimpanzees[0].x){ //허공에 침
            chimpanzees[0].alive = false;
            wakgood.state=punchState;
            //한 개 이상의 침팬지가 있어야함
            if(!chimpanzees[0].alive){
                score-=150;
                chimpanzees.splice(0, 1); //맨 앞의 한개의 침팬지 삭제'
            }
        }
    }
    if(wakgood.state != punchState){ 
        wakgood.x+=8;
    }
    //펀치가 마무리되는 부분(끝나는부분)
  //if(wakgood.state==punchState){
        if(punchTime >= 200){ //0.2초
            punchEnd();
        }else{
            punchTime+=dt;
        }
  //}
}

function punchEnd(){
    //wakgood.x+=5;
    wakgood.state = standBasicState;
    wakgood.punch = false;
    punchTime = 0;
}


//보너스 침팬지는 침팬지가 30번 나오는동안 한 번 나온다.
var bnsChimpzPrdcIdx = Math.floor(Math.random()*50)+1; // 1~ 50 중 하나
var chimxPrdcIdx = 0;


//침팬지들을 생성하는 함수
function chimpanzeeRandLocProduce(startX){
    //침팬지를 한 화면에 x좌표부터 채워 넣음
    var y;
    //랜덤한 y좌표의 침팬지들을 생성한다.(화면이 전환될때 사용)
    for(var x = startX; x <= canvas.width-30; x+=30){ //30은 원숭이 간격. 화면의 끝까지 침팬지 생성ㄴ
        //150(맨 아래), 90(중간), 30(맨 위) 중에서 랜덤으로 나온다.(2은 150, 0는 90, 0은 30)
        y = 30 + (Math.floor(Math.random()*3)*60); //0~2까지의 난수 발생시키고 60을 곱해준 수를 30에  더한다.
        chimxPrdcIdx++;
        if(chimxPrdcIdx != bnsChimpzPrdcIdx){ //일반 침팬지 생성
            chimpanzees.push(new Chimpanzee(x, y, spriteChimpanzee, chimpenz_id_basic));//랜덤한 장소에 생성
        }else{
            //보너스 침팬지 생성
            chimpanzees.push(new Chimpanzee(x, y, spriteBonusChimpanz, chimpenz_id_bonus));
        }
        if(chimxPrdcIdx == 50){
            //침팬지가 50번 나왔으면 다시 랜덤한 보너스 침팬지 idx생성
            bnsChimpzPrdcIdx = Math.floor(Math.random()*50)+1;
            chimxPrdcIdx = 0;
        }
    }
}

//침팬지의 위치는 랜덤이다.
//침팬지는 처음에는

function mainBtnClickEvent(){
    //메인 화면에서 버튼을 클릭시 실행됨
    gameRankBtn.style.animation = 'go-margin-right 2s';
    gameRoleBtn.style.animation = 'go-margin-left 2s';
    gameStartBtn.style.animation = 'go-margin-top 2s';
    gameTitle.style.animation = 'go-padding-top 2s';
}

//캐릭터와 적의 충돌 여부 확인
function collisionCheck(x, y, enemyX, enemyY){
    if(enemyX-20 <= x && enemyX+40 >= x && y >= enemyY-20 && y <= enemyY+20 && y >= enemyY-20){
        return true;
    }
    else { false; }
}
var doublePunch = false;
var keyDoubleSpc = false;
//키 입력 처리
function keyProcess(){

    //펀치 3가지
    if(keyW){
        if(wakgood.y - 60 >= 10) wakgood.y-=60;
        keyW = false;
    }
    else if(keyS){
        if(wakgood.y + 60 <= 130) wakgood.y+=60;
        keyS = false;
    }
    if(keySpace){
        if(wakgood.x+10 >= chimpanzees[0].x){
            wakgood.punch = true; wakgood.punchType = bottomPunch;
        }
        keySpace = false;
    }

    if(keyManager[0]==keySpaceDown && keyManager[1]==keySpaceUp && keyManager[2] == keySpaceDown){
        //더블 펀치
        wakgood.punch = true; wakgood.punchType = topPunch;
        doublePunch = true;
        keyManager = [];
        keyIdx = 0;
    }

    // if(keyDoubleSpc){
    //     if(collisionCheck(wakgood.x, wakgood.y, chimpanzees[0].x, chimpanzees[0].y)){
    //         punchEnd(); wakgood.punch = true; wakgood.punchType = topPunch;
    //     }
    //     keyDoubleSpc = false;
    //     doublePunch = true;
    // }

}

// const keyW = 5000;
// const keyS = 5001;
const keySpaceDown = 5002;
const keySpaceUp = 5003;
let keyManager = [ ];
let keyIdx = 0;
var seqSpaceTime = new gameTimer(100); //연속 스페이스 가능 시간

//키이벤트
document.addEventListener('keydown', function(e){
    if(e.code === 'KeyW'){  keyW = true; }
    if(e.code === 'KeyS'){ keyS = true; }
    if(e.code === 'Space'&& punchKeyInputPssible()){ 
        keySpace = true; seqSpaceTime.start();
        
    }
    if(e.code === 'Space'){
        if(chimpanzees[0].id == chimpenz_id_bonus){
            if(keyIdx == 0 || keyIdx == 2){
                keyManager[keyIdx] = keySpaceDown;
                keyIdx++;

            }
            console.log(keyManager);
        }
    }
    // if(e.code === 'Space'&& punchKeyInputPssible()){ keySpace = true; seqSpaceTime.start(); keyManager.push(keySpaceDown);  }
    // if(e.code === 'Space'&& seqSpaceTime.timeCheck()&& keyManager[1]==keyspaceUp){
    //      keyDoubleSpc = true; keyManager.shift(); keyManager.push(keySpaceDown); 
    // }
})

document.addEventListener('keyup', function(e){
    //if(chimpanzees[0].id == chimpenz_id_bonus){
        if(e.code === 'Space'){ 
                if(keyIdx == 1){
                    keyManager[keyIdx] =keySpaceUp;
                    keyIdx++;
                }
            }
    //}
    //if(e.code === 'Space'&& punchKeyInputPssible()){ keySpace = true; preSpaceTime = Date.now() }
})


//펀치 키를 누를 수 있는지의 여부를 리턴함
function punchKeyInputPssible(){
    //펀치 키가 모두 안눌려있고 왁굳(플레이어)가 펀치중이 아닐때 펀치 키의 처리를 하는 것이 가능함
    if(!keySpace && !wakgood.punch && !keyDoubleSpc){
        return true;
    }
    else return false;
}

//함수들 정의

//플레이어가 자동으로 움직여지는 부분이다.
function moveChimFront(){
    if(chimpanzees[0]!=null){
        if(wakgood.x+10 >= chimpanzees[0].x){ //침팬지 앞에서 멈추기.
            wakgood.state = standBasicState;
            wakgood.startGame = false;
        }
        else{
            if(wakgood.state == standBasicState){ wakgood.state = run1State;}
            wakgood.x+=10; //침팬지 앞이 아니라면 이동. 그리고 시작할때만
        }
    }
}
