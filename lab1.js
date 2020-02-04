'use strict'; 
const imported = require("./inventory.js"); 

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
    constructor(f,p,e,d){
        this.f = f ? {f: imported.inventory[f]} : {};
        this.p = p ? (Array.isArray(p) ? p : [p]) : [{}]; 
        this.e = e ? (Array.isArray(e) ? e : [e]) : [{}];
        this.d = d ? {d: inventory[d]} : {};
    }

    addFoundation(i) {
        this.f = {i: inventory[i]};
    }

    addProtein(i) {
        this.p = {...this.p, i: inventory[i]};
    }

    addExtra(i) {        
        this.e = {...this.e, i: inventory[i]};
    }

    addDressing(i) {
        this.d = {i: inventory[i]};
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
    constructor(f,p,e,d) {
        super(f,p,e,d);
    }

    price() {
        const disc = (prop => prop === 'f' ? 1.3 : 0.5)
        return Object.keys(this).reduce((acc, prop) => 
            acc + disc(prop) * this[prop].reduce((acc, i) => 
                    acc + imported.inventory[i].price, 0), 0);            
    }
}


class GourmetSalad extends Salad {
    
    constructor(f,p,e,d) {
        super(f,p,e,d);
    }

    addFoundation(i,s) {
        this.f = [{ingredient: i, size: s}];
    }

    addProtein(i,s) {
        this.p.push({ingredient: i, size: s});
    }

    addExtra(i,s) {
        this.e.push({ingredient: i, size: s});
    }

    addDressing(i,s) {
        this.d = [{ingredient: i, size: s}];
    }


    removeProtein(i) {
        this.p = this.p.filter((x) => x.ingredient !== i);
    }

    removeExtra(i) {
        this.e = this.e.filter((x) => x.ingredient !== i);
    }


    price() {
        return Object.keys(this).reduce((acc, prop) => 
            acc + this[prop].reduce((acc, i) => 
                    acc + i.size * imported.inventory[i.ingredient].price, 0), 0);            
    }
}


let myCeasarSalad = new Salad();
myCeasarSalad.addFoundation('Salad + Pasta');
myCeasarSalad.addProtein('Kycklingfilé');
myCeasarSalad.addExtra('Krutonger');
myCeasarSalad.addExtra('Jalapeno');
myCeasarSalad.addDressing('Ceasardressing');
myCeasarSalad.removeExtra('Jalapeno');

let myEGS = new ExtraGreenSalad();
myEGS.addFoundation('Salad + Pasta');
myEGS.addProtein('Kycklingfilé');
myEGS.addExtra('Krutonger');
myEGS.addExtra('Jalapeno');
myEGS.addDressing('Ceasardressing');
myEGS.removeExtra('Jalapeno');
console.log(myCeasarSalad);
console.log(myCeasarSalad.price());

let gSalad = new GourmetSalad();
gSalad.addFoundation("Pasta", 3);
gSalad.addProtein('Handskalade räkor från Smögen', 5);
console.log(gSalad.price());



//9. 
// 1. mySalad -> 2. ExtraGreenSallad -> 3. Sallad -> 4. Object.prototype -> 5. null. 
//
// > Object.getPrototypeOf(myExtraGreenSallad);
// ExtraGreenSallad {}
// > Object.getPrototypeOf(Object.getPrototypeOf(myExtraGreenSallad));
// Sallad {}
// > Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(myExtraGreenSallad)));
// {}
// > Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(myExtraGreenSallad))));
// null

let mySalad = new ExtraGreenSalad();



//11.
/* create  an  emptyshopping basket, 
add and remove a salad, 
calculate the total price for all salads in theshopping basket. */

class Order {
    constructor() {
        this.basket = [];
    }

    addSalad(s) {
        this.basket.push(s);
    }

    removeSalad(s) {
        this.basket = this.basket.filter(x => x !== s);
    }

    totalPrice() {
        return this.basket.reduce((acc,curr) => acc + curr.price(),0);
    }
}


let order = new Order();
order.addSalad(myCeasarSalad);
order.addSalad(myEGS);
order.addSalad(gSalad);
console.log("Total price of order: " + order.totalPrice());
