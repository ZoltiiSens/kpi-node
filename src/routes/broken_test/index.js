function GET(req, res) {
  throw "Special error";
}
function PATCH(req, res) {
  res.json({ name: "test handlerPatch" });
}

export { GET, PATCH };
