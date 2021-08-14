import { Low, JSONFile } from 'lowdb'

// Use JSON file for storage
const adapter = new JSONFile('./src/database/database.json')
const db = new Low(adapter)
await db.read()
db.data = { products: [] }

import {
    uniqueNamesGenerator,
    adjectives,
    colors,
    names
} from 'unique-names-generator';

const createDump = (arrayLength = 100) => {
    let a = new Array(arrayLength);
    for (let i = 0; i < a.length; i++) {
        const minPrice = 10;
        const maxPrice = 5000;
        const randomStock = Math.floor(Math.random() * 100);
        const randomPrice = Math.random() * (+maxPrice - +minPrice) + +minPrice;
        const salePrice = !!Math.floor((Math.random() * 1000) % 2)
        ? randomPrice * (Math.floor(Math.random() * (50 - 10) + 10) / 100)
        : randomPrice;
        const randomRating = Math.random() * (5 - 1) + 1;
        const randomVariants = (quantity) => {
            let array = [];
            for (let index = 0; index < quantity; index++) {
                array[index] = uniqueNamesGenerator({dictionaries: [colors]});
            }
            return array;        
        };
        const randomCategory = () => {
            return ['TVs', 'Phones', 'Games', 'Computers', 'Sound systems'][Math.floor(Math.random() * 5)];
        }

        a[i] = {
            id: i,
            name: uniqueNamesGenerator({
                dictionaries: [adjectives, names],
                separator: ' '
            }),
            image: `https://picsum.photos/400?image=${Math.floor(
                Math.random() * 1000
            )}`,
            stock: randomStock,
            price: randomPrice.toFixed(2),
            rating: parseInt(randomRating.toFixed(0)),
            variants: randomVariants(Math.floor(Math.random() * 4)),
            category: randomCategory()
        };

        db.data.products.push(a[i]);
        db.write()
    }

    return a;
};

createDump(20);
//console.log(db.data)