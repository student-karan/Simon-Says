let blue = document.querySelector(".blue")
let green = document.querySelector(".green")
let red = document.querySelector(".red")
let yellow = document.querySelector(".yellow")
let text = document.querySelector(".text")

let gameseq = () => {
    let btns = [blue, red, green, yellow];
    let randidx = Math.floor(Math.random() * btns.length)
    return btns[randidx];
}
let sequence = [gameseq()];
let userseq = [...sequence]

const promise = (btn) => {
    return new Promise((resolve, reject) => {
        btn.classList.add('active')
        setTimeout(() => {
            btn.classList.remove('active')
            setTimeout(() => {
                resolve(true);
            }, 250)
        }, 1000)
    })
}
let canclick = false;
let level = 1;

const btnclicked = (btn) => {
    if (!canclick) return;
    let expectedguess = userseq.shift();
    if (expectedguess === btn){
        if (userseq.length === 0) {
            text.innerText = `Level ${level++}`
            sequence.push(gameseq());
            userseq = [...sequence]
            flashing();
        }
    }
    else {
        let reset = confirm(`You Lost,Your Score is ${level-1},wanna play again?`);
        if (reset){
            level = 1;
            text.innerText = `Simon Says`
            sequence = [gameseq()];
            userseq = [...sequence]
            flashing();
        }
        else{
            text.innerText = `Simon Says`
        }
    }
}

async function flashing() {
    canclick = false;
    for (let btn of sequence) {
        await promise(btn)
    }
    canclick = true;
}
flashing();