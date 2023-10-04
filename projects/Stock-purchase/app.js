const inputValue = document.querySelector("#initial-input")
const quantityStk = document.querySelector("#quantity-of-stocks")
const currentPrice = document.querySelector("#current-price")
const btnCheck = document.querySelector("#btn")
const output = document.querySelector("#output")


function calculateProfitOrLoss(initial,qty,current){
    if(initial>current){
        var loss = (initial-current)*qty;
        var lossPercent = (loss/(initial*qty))*100;
        output.innerText = `Ohh no! The loss is ${loss} and the percent is${lossPercent}%`; 
        output.style.color = 'red';
    }else if(current>initial){
        var profit = (current-initial)*qty;
        var profitPercent = (profit/(initial*qty))*100;
        output.innerText = `Wohh!! The profit is ${profit} and the percent is ${profitPercent}%`;
        output.style.color = 'green';
    }else{
        output.innerText ="No Pain No Gain , No Gain No Pain"
        output.style.color = 'black'
    }
}
function clickHandler(){
    var initialPrice = inputValue.value;
    var quantity = quantityStk.value;
    var currentVal = currentPrice.value;
    calculateProfitOrLoss(initialPrice,quantity,currentVal)
}

btnCheck.addEventListener('click',clickHandler)