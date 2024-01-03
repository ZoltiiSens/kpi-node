function GET(req, res) {
  res.json({ name: "test handlerGet" });
}
function PURGE(req, res) {
  res.json({ name: "test handlerPurge" });
}

export { GET, PURGE };
