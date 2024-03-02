const qr = require("qrcode");

function GenerateQRcode(data) {
  return new Promise((resolve, reject) => {
    if (data !== null && data !== undefined && data !== "") {
      try {
        qr.toDataURL(data, (err, url) => {
          if (err) {
            reject(err);
          } else {
            resolve(url);
          }
        });
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error("Invalid data input"));
    }
  });
}

module.exports = GenerateQRcode;
