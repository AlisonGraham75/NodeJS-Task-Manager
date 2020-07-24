const { calculateTip, fahrenheitToCelsius, celsiusToFarenheit, add } = require('../src/math')

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

//The following passes because JEST doesnt wait the 2 sec to see that the expect fails
test('Async test demo', () => {
    setTimeout(() => {
        expect(1).toBe(2)
    },2000)
})

//Fixing the asyc issues
// test('Async test demo - fixed', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     },2000)
// })

test('Should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two numbers async/await', async () => {
    const sum = await add(10, 22)
    expect(sum).toBe(32)
})