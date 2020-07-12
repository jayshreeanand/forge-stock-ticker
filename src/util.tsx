export function generateDataURI(symbol, value, percentageChange) {
  const newValue = parseFloat(value).toFixed(2).toString();
  const percentageValue = parseFloat(percentageChange.replace(/%/i, ""));
  const isNegative = percentageValue < 0;
  const newPercentageValue = percentageValue.toFixed(1).toString() + "%";
  var svg;
  if (isNegative) {
    svg =
      '<?xml version="1.0" encoding="UTF-8"?>' +
      '<svg width="211px" height="17px" viewBox="0 0 211 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
      '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
      '<g id="negative-stock" transform="translate(0.000000, -4.000000)">' +
      '<text id="symbol" font-family="Lato-Bold, Lato" font-size="20" font-weight="bold" fill="#000000">' +
      '<tspan x="0.415" y="20">' +
      symbol +
      "</tspan>" +
      "</text>" +
      '<text id="value" font-family="Lato-Bold, Lato" font-size="20" font-weight="bold" fill="#9B9B9B">' +
      '<tspan x="56.45" y="20">' +
      newValue +
      "</tspan>" +
      "</text>" +
      '<text id="percentage" font-family="Lato-Bold, Lato" font-size="16" font-weight="bold" fill="#CA3D1F">' +
      '<tspan x="166.356" y="18">' +
      newPercentageValue +
      "</tspan>" +
      "</text>" +
      '<polygon id="Triangle" fill="#CA3D1F" transform="translate(150.000000, 12.000000) rotate(180.000000) translate(-150.000000, -12.000000) " points="150 4 158 20 142 20"></polygon>' +
      "</g>" +
      "</g>" +
      "</svg>";
  } else {
    svg =
      '<?xml version="1.0" encoding="UTF-8"?>' +
      '<svg width="211px" height="17px" viewBox="0 0 211 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
      '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
      '<g id="negative-stock" transform="translate(0.000000, -4.000000)">' +
      '<text id="symbol" font-family="Lato-Bold, Lato" font-size="20" font-weight="bold" fill="#000000">' +
      '<tspan x="0.415" y="20">' +
      symbol +
      "</tspan>" +
      "</text>" +
      '<text id="value" font-family="Lato-Bold, Lato" font-size="20" font-weight="bold" fill="#9B9B9B">' +
      '<tspan x="56.45" y="20">' +
      newValue +
      "</tspan>" +
      "</text>" +
      '<text id="percentage" font-family="Lato-Bold, Lato" font-size="16" font-weight="bold" fill="#30A035">' +
      '<tspan x="166.356" y="18">' +
      newPercentageValue +
      "</tspan>" +
      "</text>" +
      '<polygon id="Triangle" fill="#30A035" points="150 4 158 20 142 20"></polygon>' +
      "</g>" +
      "</g>" +
      "</svg>";
  }
  // const svg =
  //   '<?xml version="1.0" encoding="UTF-8"?>' +
  //   '<svg width="550px" height="243px" viewBox="0 0 550 243" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
  //   '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
  //   '<g id="counter">' +
  //   '<rect id="box" stroke="#000000" stroke-width="5" fill="#FFFFFF" x="2.5" y="2.5" width="545" height="238"></rect>' +
  //   '<text id="days-text" fill="#FF0000" font-family="Lato-Bold, Lato" font-size="103" font-weight="bold">' +
  //   '<tspan x="99.4515" y="161">' +
  //   newPercentageValue +
  //   "</tspan>" +
  //   "</text>" +
  //   "</g>" +
  //   "</g>" +
  //   "</svg>";
  const encodedSvg = new Buffer(svg).toString("base64");
  const dataUri = `data:image/svg+xml;base64,${encodedSvg}`;
  return dataUri;
}
