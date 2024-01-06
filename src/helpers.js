function json(data) {
  this.end(JSON.stringify(data));
}

function octet(payload) {
  this.end(payload.toString("hex"));
}

const helpers = { json, octet };
export default helpers;
