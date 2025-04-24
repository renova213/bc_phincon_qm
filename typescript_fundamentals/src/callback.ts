type callBack = (data: string) => void;
function getData(callback: callBack) {
  const data = "Data dari server";
  console.log("Fetching data...");
  setTimeout(() => {
    callback(data);
  }, 2000);
}

getData((data) => {
  console.log(data);
});
