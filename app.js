let nNum = document.querySelector(".nNum");
let mNum = document.querySelector(".mNum");
let procent = document.querySelector(".procent");
const work = document.querySelector(".do");

work.onclick = () => {
    let arr0 = [];

    for (let i = 0; i < Number(mNum.value); i++) {
        let answer0 = 0;

        for (let j = 0; j < Number(nNum.value); j++) {
            let bit = Math.random();
            let bit2 = 0;
            if (bit < procent.value) {
                bit2 = 1;
            } else {
                bit2 = 0;
            }

            if (bit2 > 0) {
                answer0++;
            }
        }
        arr0.push(answer0);
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
    for (let i of resultArray) {
        finalAnswer.push(i.length)
    }
    let answ = 0

    for (let i of finalAnswer) {
        answ = answ + i
    }
    console.log(answ);

    let ctxGaussian = document.getElementById('gaussianChart').getContext('2d');
    let ctxBar = document.getElementById('barChart').getContext('2d');
    const xValues = finalAnswer.map((_, index) => index);
    console.log(xValues);
    const u = finalAnswer.indexOf(Math.max(...finalAnswer)); 
    const o = nNum.value/ 13; 

    const gaussianValues = xValues.map(x => gaussian(x, u, o));

    let gaussianChart = new Chart(ctxGaussian, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                data: gaussianValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'X'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y'
                    }
                }
            }
        }
    })
    let barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: xValues,
            datasets: [{
                data: finalAnswer,

                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'X'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y'
                    }
                }
            }
        }
    })
    let orel = document.querySelector('.orel');
    orel.innerHTML = '';
}

function gaussian(x, u, o) {
    return Math.exp(-((x - u) ** 2) / (2 * o ** 2)) / (o * Math.sqrt(2 * Math.PI));
}
