let nNum = document.querySelector(".nNum")
let mNum = document.querySelector(".mNum")
let procent =document.querySelector(".procent")
let orel = document.querySelector(".orel")
const work = document.querySelector(".do")

work.onclick=()=> {
    let arr0 = []
    
    for (let i = 0; i < Number(mNum.value); i++) {
        let answer0 = 0
        
        for(let j = 0 ; j <Number(nNum.value);j++) {
            let bit = Math.random()
            let bit2 = 0
            if(bit<procent.value){
                bit2 = 1
            }else{
                bit2 = 0
            }

            if (bit2 > 0) {
                answer0++
            }
        }
        arr0.push(answer0)
    }

    const uniqueNumbers = Array.from(new Set(arr0));
    const resultArray = [];

    for (let i = 0; i <= Number(nNum.value); i++) {
    if (uniqueNumbers.includes(i)) {
        resultArray[i] = arr0.filter(item => item === i);
    } else {
        resultArray[i] = [];
    }
    }
    let finalAnswer = []
    for(let i of resultArray){
        finalAnswer.push(i.length)
    }
    
    
    for(i of finalAnswer){
        div1 = document.createElement("span")
        div2 = document.createElement("div")
        p = document.createElement("p")
        p.innerHTML=i 
        p.style.color="white"
        p.style.fontSize="6px"
        div2.style.height=`${i*2}px`
        div2.style.width = "13px"
        div2.style.background = "black"
        div1.style.display="flex"
        div1.style.flexDirection="column"
        div1.style.alignItems="center"
        div1.style.justifyContent="center"

        div1.append(p)
        div1.append(div2)
        orel.append(div1)

    }


}

