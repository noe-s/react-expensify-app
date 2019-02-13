//***************OBJECT DESTRUCTURING*************** */

// const person = {
//     name: 'Noe',
//     age: 22,
//     location:{
//         city: 'Montreal',
//         temp: '-20'
//     }
// };

// const {name = 'Anonymous', age} = person; // = 'Anonymous' is default if no name is provided

// console.log(`${name} is ${age} years old.`);


// const{city, temp: temperature} = person.location;

// if(city && temperature){ //instead of (person.location.city && person.location.city)
//     console.log(`It's ${temperature}C in ${city}`);
// }

//Book example
// const book = {
//     title: 'Killing Comentatore',
//     author: 'Haruki Murakami',
//     publisher:{
//         //name: 'Vintage'
//     }
// };
// const {name: publisherName = 'Self published' } = book.publisher;
// console.log(publisherName);

//***************ARRAY DESTRUCTURING*************** */
 /*
 - matched by position. 
 - Use ',' if you dont want one (placeholder)
 - set default with 'province = 'defaultValue', for if entry does not exist.
*/
const address = ['441 Ave. du President Kennedy', 'Montreal', , 'H3A 0A4'];
const [, city, province = 'Quebec'] = address;
console.log(`You are in ${city} ${province}.`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [itemName, ,mediumPrice, ] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}`);