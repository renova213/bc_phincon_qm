// Generic
function identity<T>(arg: T): T {
  return arg;
}

const stringIdentity = identity<string>("Hello");
const numberIdentity = identity<number>(42);

console.log(stringIdentity);
console.log(numberIdentity);

// Generic interface meta data
interface GenericMetadata<T> {
  data: T;
  createdAt: Date;
  updatedAt: Date;
}

const stringMetadata: GenericMetadata<string> = {
  data: "Hello",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const numberMetadata: GenericMetadata<number> = {
  data: 42,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const arrayMetadata: GenericMetadata<number[]> = {
  data: [1, 2, 3],
  createdAt: new Date(),
  updatedAt: new Date(),
};

console.log(stringMetadata);
console.log(numberMetadata);
console.log(arrayMetadata);

// Generic class
class GenericClass<T> {
  data: T;
  createdAt: Date;
  updatedAt: Date;
  constructor(data: T) {
    this.data = data;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
