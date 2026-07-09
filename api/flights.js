const https = require("https");

const API_KEY = "a5d8d9f12c2b305a94c115c0e92b63f89b5de23afe6b8f068e33a8045df2660d";

const ENDPOINTS = {
  dep: `https://apis.data.go.kr/B551177/StatusOfPassengerFlightsDeOdp/getPassengerDeparturesFullNew?serviceKey=${API_KEY}&numOfRows=80&pageNo=1&type=json`,
  arr: `https://apis.data.go.kr/B551177/StatusOfArrivals/getArrivalsCongestion?serviceKey=${API_KEY}&numOfRows=50&pageNo=1&type=json`,
};

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { timeout: 10000 }, (res) => {
      let body = "";
      res.on("data", c => body += c);
      res.on("end", () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(new Error("Parse error: " + body.slice(0, 300))); }
      });
    }).on("error", reject).on("timeout", () => reject(new Error("Timeout")));
  });
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Cache-Control", "s-maxage=60");

  if (req.method === "OPTIONS") return res.status(200).end();

  const type = req.query?.type || "arr";
  const url  = ENDPOINTS[type] || ENDPOINTS.arr;

  try {
    const data = await fetchUrl(url);
    return res.status(200).json(data);
  } catch (err) {
    console.error("API error:", err.message);
    return res.status(500).json({ error: err.message, url });
  }
};
