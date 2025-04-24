async function getDataAsync() {
  const data = "Data dari server";
  console.log("Fetching data...");
  return data;
}

getDataAsync().then((data) => {
  console.log(data);
});

//   setTimeout(getDataAsync, 3000);
// clock
let count = 0;
const clock = setInterval(() => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  console.log(`${hours}:${minutes}:${seconds}`);
  count++;
  if (count >= 1) {
    clearInterval(clock);
  }
}, 1000);

// Promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const rand = Math.random();
    if (rand < 0.5) {
      resolve("Success!");
    } else {
      reject("Failed!");
    }
  }, 2000);
});

promise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// async wait
async function getDataAwait() {
  console.log("Fetching data...");
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data dari server");
    }, 2000);
  });
  console.log(data);
}

// getDataAwait();

// fetch api
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// fetch api with async await
async function fetchData() {
  try {
    const responseDitto = await fetch(
      "https://pokeapi.co/api/v2/pokemon/ditto",
      {
        method: "GET",
      }
    );
    const responsePikachu = await fetch(
      "https://pokeapi.co/api/v2/pokemon/pikachu",
      {
        method: "GET",
      }
    );

    if (!responseDitto.ok) {
      throw new Error(`HTTP error! status: ${responseDitto.status}`);
    }
    if (!responsePikachu.ok) {
      throw new Error(`HTTP error! status: ${responsePikachu.status}`);
    }

    const data1 = await responseDitto.json();
    const data2 = await responsePikachu.json();
    console.log(data1);
    console.log(data2);
  } catch (err) {
    console.log(err);
  }
}

// fetchData();

// post api
async function postData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

postData();

// invocation
(function () {
  console.log("This function runs immediately!");
})();
