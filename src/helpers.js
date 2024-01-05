function json(data) {
  this.end(JSON.stringify(data));
}

function octet(data) {
  this.end("Hi there");
}

const helpers = { json, octet };
export default helpers;
