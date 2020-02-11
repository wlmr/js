
let counterFunction = () => {
    var counter = 1;
    return _ => counter++;
};

let numberGen = counterFunction();

export class Salad {

    constructor(){
        this.f = {};
        this.p = {};
        this.e = {};
        this.d = {};
    }

    addFoundation(name, value) {
        this.f = {[name]: value};
    }

    addProtein(name, value) {
        this.p = {...this.p, [name]: value};
    }

    addExtra(name, value) {        
        this.e = {...this.e, [name]: value};
    }

    addDressing(name, value) {
        this.d = {[name]: value};
    }

    removeFoundation() {
        this.f = {};
    }

    removeProtein(name) {
        delete this.p[name];
    }

    removeExtra(name) {
        delete this.e[name];    
    }

    removeDressing() {
        this.d = {};
    }

    price() {
        return Object.keys(this).reduce((acc, prop) => 
        acc + Object.keys(this[prop]).reduce((acc, i) => 
        acc + this[prop][i].price, 0), 0);
    }

    toString() {
        return Object.keys(this.f) + "," + Object.keys(this.p) + "," + Object.keys(this.e) + "," + Object.keys(this.d);
    } 
}

export class Order {
    constructor() {
        //window.localStorage.clear();
        this.basket = [];
        Object.keys(window.localStorage)
        .sort()
        .forEach(
            name => {
                let item = JSON.parse(window.localStorage.getItem(name));
                Object.setPrototypeOf(item, Salad.prototype);
                this.basket.push(item);
                numberGen();
            }
        );
    }


    emptyOrders() {
        window.localStorage.clear();
        this.basket = [];
    }

    addSalad(s) {
        this.basket.push(s);
        const name = numberGen();
        const stringified = JSON.stringify(s);
        window.localStorage.setItem(name, stringified);
    }

    removeSalad(s) {
        this.basket = this.basket.filter(x => x !== s);
    }

    totalPrice() {
        return this.basket.reduce((acc,curr) => acc + curr.price(), 0);
    }
}

