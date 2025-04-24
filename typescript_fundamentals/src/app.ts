let message: string = "Hello World";
console.log(message);

// Union
let data: string | number | boolean;

data = "hello";
data = 12;
data = true;

console.log(data);

type Color =
  | { type: "red"; value: "red" }
  | { type: "green"; value: "green" }
  | { type: "blue"; value: "blue" };

function printColor(color: Color) {
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

// intersection type
type Circle = { radius: number } & { center: { x: number; y: number } };

const circle: Circle = {
  radius: 10,
  center: {
    x: 0,
    y: 0,
  },
};

console.log(circle);
