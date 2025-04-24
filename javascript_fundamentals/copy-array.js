let originalstudents = [
  { name: "Rizco" },
  { name: "Farhan" },
  { name: "Faiz" },
];

// shallow copy
let studentsShallowCopy = [...originalstudents];
studentsShallowCopy[0].name = "Rizco Renova";
console.log(originalstudents);

let originalstudents2 = [
  { name: "Rizco" },
  { name: "Farhan" },
  { name: "Faiz" },
];

// deep copy
let studentsDeepCopy = JSON.parse(JSON.stringify(originalstudents2));
studentsDeepCopy[0].name = "Rizco Renova";
console.log(originalstudents2);
