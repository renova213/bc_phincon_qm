function getData(callback) {
    const data = "Data dari server";
    console.log("Fetching data...");
    setTimeout(() => {
        callback(data);
    }, 2000);
}
getData((data) => {
    console.log(data);
});
//# sourceMappingURL=callback.js.map