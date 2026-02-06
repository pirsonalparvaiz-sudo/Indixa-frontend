import { CONFIG } from "../config/config.js";
import { $ } from "../core/utils.js";
import { STATE } from "../core/state.js";

// Local partner state (immutable pattern)
const PARTNER = {
  onDuty: false,
  activeRequest: null,
};

// Init UI
$("dutyToggle").checked = PARTNER.onDuty;
updateStatus();

// Duty toggle
$("dutyToggle").onchange = (e) => {
  PARTNER.onDuty = e.target.checked;
  updateStatus();
  
  if (PARTNER.onDuty) {
    // Mock incoming request when duty ON
    simulateIncomingRequest();
  } else {
    PARTNER.activeRequest = null;
    $("requestBox").innerText = "No active request";
  }
};

// Accept
$("acceptBtn").onclick = () => {
  if (!PARTNER.activeRequest) return;
  
  PARTNER.activeRequest.status = "ACCEPTED";
  updateStatus("Request accepted. Go to pickup.");
};

// Reject
$("rejectBtn").onclick = () => {
  if (!PARTNER.activeRequest) return;
  
  PARTNER.activeRequest.status = "REJECTED";
  updateStatus("Request rejected. Passing to next partner.");
  
  // Clear and wait
  PARTNER.activeRequest = null;
  $("requestBox").innerText = "No active request";
};

// Helpers
function simulateIncomingRequest() {
  PARTNER.activeRequest = {
    id: crypto.randomUUID(),
    query: "Cab – Nearby pickup",
    status: "PENDING",
  };
  
  $("requestBox").innerText =
    "Service: " + PARTNER.activeRequest.query;
}

function updateStatus(extra = "") {
  $("statusBox").innerHTML = `
    Duty: ${PARTNER.onDuty ? "ON" : "OFF"}<br/>
    Request: ${
      PARTNER.activeRequest
        ? PARTNER.activeRequest.status
        : "NONE"
    }
    ${extra ? "<br/>" + extra : ""}
  `;
}