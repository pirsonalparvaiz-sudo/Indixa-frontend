import { CONFIG } from "../config/config.js";
import { $ } from "../core/utils.js";

// Initialize toggles
$("locToggle").checked = CONFIG.FEATURES.LOCATION;
$("camToggle").checked = CONFIG.FEATURES.CAMERA;
$("partnerToggle").checked = CONFIG.FEATURES.PARTNER;

// Update status text
function updateStatus() {
  $("statusBox").innerHTML = `
    Location: ${CONFIG.FEATURES.LOCATION ? "ON" : "OFF"}<br/>
    Camera: ${CONFIG.FEATURES.CAMERA ? "ON" : "OFF"}<br/>
    Partner: ${CONFIG.FEATURES.PARTNER ? "ON" : "OFF"}
  `;
}

updateStatus();

// Toggle handlers (local only – future me API replace hoga)
$("locToggle").onchange = e => {
  CONFIG.FEATURES.LOCATION = e.target.checked;
  updateStatus();
};

$("camToggle").onchange = e => {
  CONFIG.FEATURES.CAMERA = e.target.checked;
  updateStatus();
};

$("partnerToggle").onchange = e => {
  CONFIG.FEATURES.PARTNER = e.target.checked;
  updateStatus();
};