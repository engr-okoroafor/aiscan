const wifi = require("node-wifi");

wifi.init({ iface: null });

async function scanNetworks() {
  return new Promise((resolve, reject) => {
    wifi.scan((err, networks) => {
      if (err) {
        reject(err);
      } else {
        resolve(networks);
      }
    });
  });
}

module.exports = { scanNetworks };
