import inventory from "./inventory.ES6"; 

export class Salad {
    constructor(f,p,e,d){
        this.f = f && {[f]: true};
        this.p = p && {[p]: true}; 
        this.e = e && {[e]: true};
        this.d = d && {[d]: true};
    }

    addFoundation(i) {
        this.f = {[i]: true};
    }

    addProtein(i) {
        this.p = {...this.p, [i]: true};
    }

    addExtra(i) {        
        this.e = {...this.e, [i]: true};
    }

    addDressing(i) {
        this.d = {[i]: true};
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
                    acc + inventory[i].price, 0), 0);
    }

    /* toString() {
        return Object.keys(this).map(k => )
    } */
}

let test = new Salad();
test.addFoundation('Pasta');
test.addProtein('Kycklingfilé');
test.addExtra('Avocado');
test.addDressing('Dillmayo');
console.log(test.price());

export class Order {
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
        return this.basket.reduce((acc,curr) => acc + curr.price(), 0);
    }
}

