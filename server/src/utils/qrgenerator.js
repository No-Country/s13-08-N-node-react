// generadorQR.js
const qr = require("qrcode");

function GenerateQRcode(data, callback) {
  qr.toDataURL(data, (err, url) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, url);
  });
}

module.exports = GenerateQRcode;
