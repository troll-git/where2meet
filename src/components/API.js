export function getPlaceCoords(stringExpr, processData) {
  let url = new URL("https://nominatim.openstreetmap.org/search");
  url.search = new URLSearchParams({
    q: stringExpr,
    format: "geojson",
    //polygon_geojson: 1,
    "accept-language": "pl",
  });

  //fetch(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => processData(data));
}

export function getIsoline(coords,timerange,setIsoline){
  let url = new URL("https://isoline.route.ls.hereapi.com/routing/7.2/calculateisoline.json");
  url.search = new URLSearchParams({
    apiKey:"tT0xJxu5VUFgwFIUzD8Dkz4UxWJwm-q_l8xmaxu_FI8",
    mode:"fastest;car",
    start:[coords[1],coords[0]],
    rangetype:'time',
    range:timerange
  });
  fetch(url)
  .then((response) => response.json())
  .then((data) => setIsoline(data));
  //?mode=fastest%3Bcar&start=59.94999286952315%2C10.869465150213026&rangetype=time&range=900&apiKey=tT0xJxu5VUFgwFIUzD8Dkz4UxWJwm-q_l8xmaxu_FI8")
  //.then(response=>response.json()).then(data=>setIsoline(data)).then(console.log("lo"))
}