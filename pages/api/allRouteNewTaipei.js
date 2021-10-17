import crypto from "crypto";
import axios from "axios";

export const busRoute = async (req, res) => {
  const baseUrl = `https://ptx.transportdata.tw/MOTC/`;
  const getAuthorizationHeader = () => {
    const AppID = process.env.APP_ID;
    const AppKey = process.env.APP_KEY;
    const GMTString = new Date().toGMTString();
    const HMAC = crypto
      .createHmac("sha1", AppKey)
      .update(`x-date: ${GMTString}`)
      .digest("base64");
    const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
    return { Authorization: Authorization, "X-Date": GMTString };
  };

  const getData = () =>
    axios
      .get(`${baseUrl}v2/Bus/Route/City/NewTaipei?$format=JSON`, {
        headers: getAuthorizationHeader(),
      })
      .then(response => {
        res.status(200).json({ data: response.data });
        return response.data.data;
      })
      .catch(error => {
        return res.status(400).json({ data: error });
      });
  const fakeGetData = () =>
    new Promise(resolve => {
      resolve(getData());
    });

  fakeGetData();
};

export default busRoute;
