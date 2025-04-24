let message = "Hello World";
console.log(message);
// Union
let data;
data = "hello";
data = 12;
data = true;
console.log(data);
function printColor(color) {
    switch (color.type) {
        case "red":
            console.log("Merah");
            break;
        case "green":
            console.log("Hijau");
            break;
        case "blue":
            console.log("Biru");
            break;
    }
}
printColor({ type: "red", value: "red" });
printColor({ type: "green", value: "green" });
printColor({ type: "blue", value: "blue" });
const circle = {
    radius: 10,
    center: {
        x: 0,
        y: 0,
    },
};
console.log(circle);
//# sourceMappingURL=app.js.map