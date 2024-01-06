import { Buffer, Blob } from "node:buffer";
// import { fs } from "fs";
function json(data) {
  this.end(JSON.stringify(data));
}

function octet(payload) {
  console.log(`payload: ${payload}`);
  this.end(payload.toString("hex"));
  // let dataBuffer = Buffer.from([]);
  // let
  // console.log(`dataBuffer: ${dataBuffer}`);
  // req.on('data', (chunk) => {
  //   console.log(`chunk: ${chunk}`);
  //   dataBuffer.Buffer.concat([dataBuffer, chunk])
  // });
  // console.log(`dataBuffer: ${dataBuffer}`);
  // let stringData = dataBuffer.toString('utf8');
  // this.end('hello');
}

const helpers = { json, octet };
export default helpers;
