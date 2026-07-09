const https = require("https");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const API_KEY = process.env.PUBLIC_API_KEY ||
    "a5d8d9f12c2b305a94c115c0e92b63f89b5de23afe6b8f068e33a8045df2660d";

  const { type = "dep", numOfRows = "50" } = req.query;

  // 출발편: StatusOfPassengerFlightsDeOdp (상세) or 입국장
  const endpoints = {
    dep: `https://apis.data.go.kr/B551177/StatusOfPassengerFlightsDeOdp/getPassengerDeparturesFullNew?serviceKey=${API_KEY}&numOfRows=${numOfRows}&pageNo=1&type=json`,
    arr: `https://apis.data.go.kr/B551177/StatusOfArrivals/getArrivalsCongestion?serviceKey=${API_KEY}&numOfRows=${numOfRows}&pageNo=1&type=json`,
  };

  const url = endpoints[type] || endpoints.dep;

  try {
    const data = await new Promise((resolve, reject) => {
      https.get(url, (r) => {
        let body = "";
        r.on("data", (chunk) => (body += chunk));
        r.on("end", () => {
          try { resolve(JSON.parse(body)); }
          catch(e) { reject(new Error("JSON parse error: " + body.slice(0,200))); }
        });
      }).on("error", reject);
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
