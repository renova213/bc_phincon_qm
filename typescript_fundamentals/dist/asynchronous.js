var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getDataAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = "Data dari server";
        console.log("Fetching data...");
        return data;
    });
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
        }
        else {
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
function getDataAwait() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Fetching data...");
        const data = yield new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Data dari server");
            }, 2000);
        });
        console.log(data);
    });
}
// getDataAwait();
// fetch api
fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
// fetch api with async await
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const responseDitto = yield fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
                method: "GET",
            });
            const responsePikachu = yield fetch("https://pokeapi.co/api/v2/pokemon/pikachu", {
                method: "GET",
            });
            if (!responseDitto.ok) {
                throw new Error(`HTTP error! status: ${responseDitto.status}`);
            }
            if (!responsePikachu.ok) {
                throw new Error(`HTTP error! status: ${responsePikachu.status}`);
            }
            const data1 = yield responseDitto.json();
            const data2 = yield responsePikachu.json();
            console.log(data1);
            console.log(data2);
        }
        catch (err) {
            console.log(err);
        }
    });
}
// fetchData();
// post api
function postData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://jsonplaceholder.typicode.com/posts", {
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
            const data = yield response.json();
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    });
}
postData();
// invocation
(function () {
    console.log("This function runs immediately!");
})();
//# sourceMappingURL=asynchronous.js.map