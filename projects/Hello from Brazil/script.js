document.getElementById("greetingsButton").addEventListener("click", () => {
    const greetings = ["World", "Brazil", "HacktoberFest", "Devs"];
    const worldSpan = document.getElementById("world");
    let currentIndex = greetings.indexOf(worldSpan.textContent);
    currentIndex = (currentIndex + 1) % greetings.length;
    worldSpan.textContent = greetings[currentIndex];
});