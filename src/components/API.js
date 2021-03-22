export function getPlaceCoords(stringExpr, processData) {
  let url = new URL("https://nominatim.openstreetmap.org/search");
  url.search = new URLSearchParams({
    q: stringExpr,
    format: "geojson",
  });

  fetch(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => processData(data));
}
