const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent)

const fahrenheitToCelsius = (temp) => {
    return (temp - 32) /1.8
}

const celsiusToFarenheit = (temp) => {
    return(temp * 1.8) + 32
}

module.exports = {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFarenheit
}