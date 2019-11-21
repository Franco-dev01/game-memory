
const socket = io('http://localhost:3000/user-register');
const form = document.querySelector('form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const data = {
        name: document.querySelector('input[name="name"]').value,
        password: document.querySelector('input[name="password"]').value,
    }
    socket.emit('user-register',data);
});
socket.on('user-register',(data)=>{
    document.querySelector('input[name="name"]').value = "";
    document.querySelector('input[name="password"]').value = "";
    $('#index .container form a').css({display:"inline-block"},200);
});

const tests = ["Rejoignez-nous  pour  l'aventure Nanienne","une communauté de de developpeurs","une école ,une formation, un devenir","NaN next Gen"];
let alreadyuse = [];
const anim = () => {
    if(alreadyuse.length === tests.length) {
        alreadyuse = [];
    }
    let number = Math.floor(Math.random() * tests.length);
    while(alreadyuse.includes(number)){
        number = Math.floor(Math.random() * tests.length);
    }
    const test = tests[number];
    let await = 2;
    const wait = setInterval(()=>{
        await -= 1;
        if(await === 0){
            clearInterval(wait);
            let i = 0;
            const int = setInterval(()=>{
                $('.anim p .text').text($('.anim p .text').text()+test[i]);
                i++;
                if(i === test.length){
                    clearInterval(int);
                    let latence = 2;
                    const lat = setInterval(()=>{
                        latence--;
                        if(latence === 0){
                            clearInterval(lat);
                            const int2 = setInterval(()=>{
                                $('.anim p .text').text($('.anim p .text').text().slice(0,$('.anim p .text').text().length-1));
                                if($('.anim p .text').text() === ""){
                                    clearInterval(int2);
                                    alreadyuse.push(number);
                                    anim();
                                }
                            },20);
                        }
                    },1000)
                }
            },20);
        }
    },1000);
};
anim();