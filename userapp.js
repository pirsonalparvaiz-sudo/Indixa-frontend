function detectLocation() {
  const status = document.querySelector("#locationStatus");
  
  if (!navigator.geolocation) {
    status.innerText = "Location not supported";
    return;
  }
  
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      
      status.innerText = `📍 Location found (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
      
      // save in state
      window.APP_STATE = {
        lat,
        lng
      };
    },
    (err) => {
      status.innerText = "⚠️ Location permission denied";
      console.error(err);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000
    }
  );
}

detectLocation();

import { FLOW } from "./core/flow.js";
import { CONFIG } from "./config/config.js";

// inside sendRequest(query)
const req = FLOW.createRequest(query, STATE.request.photo);

const gate = FLOW.adminGate(req, CONFIG);
if (!gate.allowed) {
  showMessage($("resultBox"), gate.reason);
  return;
}

FLOW.dispatchToPartners(req);
showMessage($("resultBox"), "Request sent to nearby partners");