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

    const uniqueNumbers = [...new Set(arr0)];
    const resultArray = Array.from({ length: Number(nNum.value) + 1 }, () => []);

    for (let i = 0; i < arr0.length; i++) {
        resultArray[arr0[i]].push(arr0[i]);
    }

    let finalAnswer = resultArray.map(arr => arr.length);
    let answ = finalAnswer.reduce((acc, val) => acc + val, 0);
    console.log(answ);

    let ctxGaussian = document.getElementById('gaussianChart').getContext('2d');
    let ctxBar = document.getElementById('barChart').getContext('2d');
    const xValues = finalAnswer.map((_, index) => index);

    
    const u = finalAnswer.indexOf(Math.max(...finalAnswer));
    const universalSigma = calculateUniversalSigma(finalAnswer);
    
    const gaussianValues = xValues.map(x => gaussian(x, u, universalSigma));

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
    });

    let barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: xValues,
            datasets: [{
                data: finalAnswer,
                borderColor: 'rgba(255, 99, 132, 1)',
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
    });

    let orel = document.querySelector('.orel');
    orel.innerHTML = '';
};

function gaussian(x, u, universalSigma) {
    return Math.exp(-((x - u) ** 2) / (2 * universalSigma ** 2)) / (universalSigma * Math.sqrt(2 * Math.PI));
}


function calculateUniversalSigma(data) {
    const mean = data.reduce((acc, val, i) => acc + val * i, 0) / data.reduce((acc, val) => acc + val, 0);
    const variance = data.reduce((acc, val, i) => acc + (i - mean) * (i - mean) * val, 0) / data.reduce((acc, val) => acc + val, 0);
    return Math.sqrt(variance);
}
