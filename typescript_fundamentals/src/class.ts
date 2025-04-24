// class
class Car {
  brand: string;
  model: string;
  year: number;
  constructor(data: any) {
    this.brand = data.brand ?? "";
    this.model = data.model ?? "";
    this.year = data.year ?? 0;
  }

  displayInfo(): string {
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
