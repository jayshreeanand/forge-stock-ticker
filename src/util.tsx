export function generateDataURI(symbol, value, percentageChange) {
  const newValue = parseFloat(value).toFixed(2).toString();
  const percentageValue = parseFloat(percentageChange.replace(/%/i, ""));
  const isPositive = percentageValue > 0;
  const newPercentageValue = percentageValue.toFixed(1).toString() + "%";

  if (isPositive) {
  } else {
  }
  const svg =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<svg width="550px" height="243px" viewBox="0 0 550 243" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
    '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
    '<g id="counter">' +
    '<rect id="box" stroke="#000000" stroke-width="5" fill="#FFFFFF" x="2.5" y="2.5" width="545" height="238"></rect>' +
    '<text id="days-text" fill="#FF0000" font-family="Lato-Bold, Lato" font-size="103" font-weight="bold">' +
    '<tspan x="99.4515" y="161">' +
    newPercentageValue +
    "</tspan>" +
    "</text>" +
    "</g>" +
    "</g>" +
    "</svg>";
  const encodedSvg = new Buffer(svg).toString("base64");
  const dataUri = `data:image/svg+xml;base64,${encodedSvg}`;
  return dataUri;
}
