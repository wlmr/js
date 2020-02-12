'use strict'; 

const imported = require("./inventory.js"); 
const inventory = imported.inventory;

const keys = Object.keys(imported.inventory);

const foundations = keys.filter((x) => imported.inventory[x].foundation);
const extras = keys.filter((x) => imported.inventory[x].extra);
const proteins = keys.filter((x) => imported.inventory[x].protein);
const dressings = keys.filter((x) => imported.inventory[x].dressing);

console.log("Foundations: " + foundations);
console.log("Proteins: " + proteins);
console.log("Extras: " + extras);
console.log("Dressings: " + dressings);

class Salad {
    constructor(){
        this.f = {};
        this.p = {};
        this.e = {};
        this.d = {};
    }

    addFoundation(i) {
        this.f = {[i] : inventory[i]};
    }

    addProtein(i) {
        this.p = {...this.p, [i]: inventory[i]};
    }

    addExtra(i) {        
        this.e = {...this.e, [i]: inventory[i]};
    }

    addDressing(i) {
        this.d = {[i] : inventory[i]};
    }

    removeFoundation() {
        this.f = {};
    }

    removeProtein(i) {
        delete this.p[i];
    }

    removeExtra(i) {
        delete this.e[i];    
    }

    removeDressing() {
        this.d = {};
    }

    price() {
        return Object.keys(this).reduce((acc, prop) => 
                    acc + Object.keys(this[prop]).reduce((acc, i) => 
                    acc + this[prop][i].price, 0), 0);
    }
}

class ExtraGreenSalad extends Salad {

    price() {
        const disc = (prop => prop === 'f' ? 1.3 : 0.5);
        return Object.keys(this).reduce((acc, prop) => 
                    acc + Object.keys(this[prop]).reduce((acc, i) => 
                    acc + disc(prop) * this[prop][i].price, 0), 0);
    }
}

class GourmetSalad extends Salad {

    addProtein(i, s) {
        let item = {...inventory[i], size:s};
        this.p = {[i] : item};
    }

    addFoundation(i, s) {
        let item = {...inventory[i], size:s};
        this.f = {[i] : item};
    }

    addDressing(i, s) {
        let item = {...inventory[i], size:s};
        this.d = {...this.d, [i]: item};
    }

    addExtra(i, s) {
        let item = {...inventory[i], size:s};
        this.e = {...this.e, [i]: item};
    }

    price() {
        return Object.keys(this).reduce((acc, prop) => 
                    acc + Object.keys(this[prop]).reduce((acc, i) => 
                    acc + this[prop][i].size* this[prop][i].price, 0), 0);
    }
}

let s = new ExtraGreenSalad();
s.addFoundation('Salad + Pasta');
s.addProtein('Kycklingfilé');
s.addExtra('Avocado');
s.addExtra('Paprika');
s.addDressing('Rhodeisland');
console.log(s);
console.log("Extra green salad price: " + s.price());

let myceasarsalad = new Salad();
myceasarsalad.addFoundation('Salad + Pasta');
myceasarsalad.addProtein('Kycklingfilé');
myceasarsalad.addExtra('Krutonger');
myceasarsalad.addExtra('Jalapeno');
myceasarsalad.addDressing('Ceasardressing');
myceasarsalad.removeExtra('Jalapeno');

let myegs = new ExtraGreenSalad();
myegs.addFoundation('Salad + Pasta');
myegs.addProtein('Kycklingfilé');
myegs.addExtra('Krutonger');
myegs.addExtra('Jalapeno');
myegs.addDressing('Ceasardressing');
myegs.removeExtra('Jalapeno');
console.log(myceasarsalad);
console.log("Caesar salad price: " + myceasarsalad.price());

let gsalad = new GourmetSalad();
gsalad.addFoundation("Pasta", 3);
gsalad.addProtein('Handskalade räkor från Smögen', 5);
gsalad.addExtra('Krutonger', 0.5);
gsalad.addDressing('Rhodeisland', 10);
console.log(gsalad);
console.log("Gourmet salad price: " + gsalad.price());


//9. 
// 1. mysalad -> 2. extragreensallad.prototype -> 3. sallad.prototype -> 4. object.prototype -> 5. null. 
//
// > object.getprototypeof(myextragreensallad);
// extragreensallad {}
// > object.getprototypeof(object.getprototypeof(myextragreensallad));
// sallad {}
// > object.getprototypeof(object.getprototypeof(object.getprototypeof(myextragreensallad)));
// {}
// > object.getprototypeof(object.getprototypeof(object.getprototypeof(object.getprototypeof(myextragreensallad))));
// null

//let mysalad = new ExtraGreenSalad();



//11.
/* create  an  emptyshopping basket, 
add and remove a salad, 
calculate the total price for all salads in theshopping basket. */

class Order {
    constructor() {
        this.basket = [];
    }

    addsalad(s) {
        this.basket.push(s);
    }

    removesalad(s) {
        this.basket = this.basket.filter(x => x !== s);
    }

    totalprice() {
        return this.basket.reduce((acc,curr) => acc + curr.price(),0);
    }
}

let order = new Order();
order.addsalad(myceasarsalad);
order.addsalad(myegs);
order.addsalad(gsalad);
console.log("total price of order: " + order.totalprice());