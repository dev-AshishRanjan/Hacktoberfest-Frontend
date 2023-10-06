function convertTemperature() {
    var temperature = parseFloat(document.getElementById("temperature").value);
    var unit = document.getElementById("unit").value;
    var resultElement = document.getElementById("result");
    var convertedTemperature;
    
    if (unit === "celsius") {
        // Convert Celsius to Fahrenheit
        convertedTemperature = (temperature * 9/5) + 32;
        resultElement.innerHTML = `${temperature} Celsius is equal to ${convertedTemperature.toFixed(2)} Fahrenheit.`;
    } else {
        // Convert Fahrenheit to Celsius
        convertedTemperature = (temperature - 32) * 5/9;
        resultElement.innerHTML = `${temperature} Fahrenheit is equal to ${convertedTemperature.toFixed(2)} Celsius.`;
    }
}
