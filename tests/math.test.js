const { calculateTip, fahrenheitToCelsius, celsiusToFarenheit } = require('../src/math')

test ('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)

    expect(total).toBe(13)
    
})

test ('Should calculate total with default tip', () => {
    const total = calculateTip(10)

    expect(total).toBe(12.5)
    
})

test('Should convert 32 F to 0 C', () => {
    const tempInCelcius = fahrenheitToCelsius(32)
    expect(tempInCelcius).toBe(0)
})


test('Should convert 0 C to 32 F', () => {
    const tempInFahreneit = celsiusToFarenheit(0)
    expect(tempInFahreneit).toBe(32)
})