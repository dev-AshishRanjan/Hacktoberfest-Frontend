let bulb = document.getElementById("bulb");
let colorButtons = document.querySelectorAll("button[name='btn']");

colorButtons.forEach((btn)=>{
    btn.addEventListener("click", (event)=>{
        const color = event.target.value;

        bulb.style.backgroundColor = color;
    })
})