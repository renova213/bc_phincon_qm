// Generic
function identity(arg) {
    return arg;
}
const stringIdentity = identity("Hello");
const numberIdentity = identity(42);
console.log(stringIdentity);
console.log(numberIdentity);
const stringMetadata = {
    data: "Hello",
    createdAt: new Date(),
    updatedAt: new Date(),
};
const numberMetadata = {
    data: 42,
    createdAt: new Date(),
    updatedAt: new Date(),
};
const arrayMetadata = {
    data: [1, 2, 3],
    createdAt: new Date(),
    updatedAt: new Date(),
};
console.log(stringMetadata);
console.log(numberMetadata);
console.log(arrayMetadata);
// Generic class
class GenericClass {
    constructor(data) {
        this.data = data;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
//# sourceMappingURL=generic.js.map