const add = (a,b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;

test('Should add 2 numbers', () => {
    const result = add(3,4);
    expect(result).toBe(7);
});
//test required args: Name (string), code to run for test-case  

test('Should greet the name provided', () => {
    const result = generateGreeting('Noe');
    expect(result).toBe('Hello Noe!')
})

test('Should generate greeting with no name', () => {
    const result = generateGreeting();
    expect(result).toBe('Hello Anonymous!')
})