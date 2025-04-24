// class
class Car {
    constructor(data) {
        var _a, _b, _c;
        this.brand = (_a = data.brand) !== null && _a !== void 0 ? _a : "";
        this.model = (_b = data.model) !== null && _b !== void 0 ? _b : "";
        this.year = (_c = data.year) !== null && _c !== void 0 ? _c : 0;
    }
    displayInfo() {
        return `${this.year} ${this.brand} ${this.model}`;
    }
}
let carData = {
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
};
let car = new Car(carData);
console.log(car.displayInfo());
//# sourceMappingURL=class.js.map