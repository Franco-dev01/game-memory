const socket = io('http://192.168.50.160:3000/nan_games/games/memory');
$(window).on('load',function(){
    $('#preloader').fadeOut(400);
});
let verifTab,tab,all,comptClick,DATAS, go = document.querySelector('#game .go'),comptScale;
const setData = (data) => {
    verifTab = [];
    tab = [];
    all = [];
    comptClick = false;
    DATAS = data;
};
const setBlockWhite = ()=>{
 $('.child').each(function(){
     $(this).css('background-color','white');
 });
};

const setBlock = (data) => {
        $('.cont').html('');
        let s = 1;
        while (s <= data.nbCase) {
            $(`<div class="child" style="height:${data.heightDiv}px;width:${data.widthDiv}px" ></div>`).appendTo($('.cont'));
            s++;
        }
        $('.child').each(function(){
            $(this).fadeIn(500);
        });
};

const getRandomCase = (compt) => {
    all = document.querySelectorAll('.child');
    while (compt > 0) {
        let number = Math.floor(Math.random() * all.length);
        while (tab.includes(number)) {
            number = Math.floor(Math.random() * all.length);
        }
        tab.push(number);
        compt--;
    }
};

const setRandomCase = (compt,data) => {
    let int = setInterval(() => {
        all[tab[compt]].style.backgroundColor = 'blue';
        compt++;
        if (compt === tab.length) {
            clearInterval(int);
            let awaitime = 3;
            let Await = setInterval(() => {
                awaitime--;
                if (awaitime === 0) {
                    clearInterval(Await);
                    for (let i = 0; i < tab.length; i++) {
                        all[tab[i]].style.backgroundColor = 'white';
                        comptClick = true;
                    }
                    aff()
                }
            }, data.tempTransition);
        }
    }, data.tempAffichage);
};


const reproduceEventByUser = () =>{
    for (let i = 0; i < all.length; i++) {
        all[i].addEventListener('click', () => {
            if (comptClick) {
                all[i].style.backgroundColor = "grey";
                verifTab.push(i);
            }
            if (verifTab.length === tab.length) {
                comptClick = false;
                document.querySelector('.validate').click();
            }
        });
    }
};

const Game = (DATAS) => {
    setData(DATAS);
    let c = 2;
    const int = setInterval(()=>{
        c--;
        if(c === 1){
            setBlock(DATAS);
        }
        if(c === 0){
            clearInterval(int);
            $('#preloader').fadeOut(400);
            let compt = DATAS.caseVisible;
            getRandomCase(compt);
            compt = 0;
            setRandomCase(compt,DATAS);
        }
    },500);
};

const aff = () => {
    go.style.display = "block";
    comptScale = 0;
    const int2 = setInterval(()=>{
        comptScale+=1;
        let opa = window.getComputedStyle(go,null).opacity;
        go.style.opacity = (parseFloat(opa)-0.5).toString();
        go.style.transform = "scale("+comptScale+")";
        if(comptScale === 20){
            console.log(go.style.opacity);
            console.log(go.style.transform);
            clearInterval(int2);
            go.style.display = "none";
            go.style.opacity = "1";
            go.style.transform =  "scale(0)";
            reproduceEventByUser();
        }
    },50);
};

const ifIsMatch = (tab1, tab2,ordre) => {
    let verif = true;
    if(ordre){
        for (let i = 0; i < tab1.length; i++) {
            if (tab1[i] !== tab2[i]) {
                verif = false;
            }
        }
    }else{
        for (let i = 0; i < tab2.length; i++) {
            if(!tab1.includes(tab2[i])){
                verif = false;
            }
        }
    }
    return verif;

};

const afficheNiveau = (data)=>{
    setBlockWhite();
  $('#preloader h2').text("niveau "+data);
  $('#preloader p').text('');
  $('#preloader').fadeIn(400);
};

document.querySelector('.validate').addEventListener('click',()=>{
    if (ifIsMatch(verifTab, tab, DATAS.ordre)) {
        for (let i = 0; i < tab.length; i++) {
            all[tab[i]].style.backgroundColor = 'lime';
        }
        let awaitime = 3;
        let Await = setInterval(() => {
            awaitime--;
            if (awaitime === 0) {
                clearInterval(Await);
                if(DATAS.niveau <= 18){
                    afficheNiveau(DATAS.niveau+1);
                    socket.emit('passlevel',$('.unbreakable').text(),DATAS.niveau-1)
                }else{
                    alert('yes')
                }
            }
        }, 500);
    } else {
        for (let i = 0; i < tab.length; i++) {
            all[verifTab[i]].style.backgroundColor = 'red';
        }
        let awaitime = 3;
        let Await = setInterval(() => {
            awaitime--;
            if (awaitime === 0) {
                clearInterval(Await);
                afficheNiveau(DATAS.niveau);
                socket.emit('setTentative',$('.unbreakable').text(),DATAS.niveau-1)
            }
        }, 500);
    }
    return false;
});

const button = document.querySelector('.welcome button');
button.addEventListener('click',()=>{
    document.querySelector('.welcome').style.display = "none";
    document.querySelector('.ombre').style.display = "none";
    afficheNiveau(1);
    socket.emit('begin_game_memory')
});

socket.on('begin_game_memory',(data)=>{
    Game(data)
});

socket.on('passlevel',(data)=>{
    Game(data);
});

socket.on('setTentative',(data)=>{
    Game(data);
});