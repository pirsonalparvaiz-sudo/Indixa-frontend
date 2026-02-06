import { CONFIG } from "../config/config.js";
import { $ } from "../core/utils.js";

// ---- LOCKED COMMISSION RULES ----
const COMMISSION = {
  TYPE: "PERCENT", // PERCENT or FLAT
  VALUE: 10, // 10%
};

// ---- MOCK SERVICE AMOUNT ----
const SERVICE_AMOUNT = 500; // ₹

// Calculate
const commissionAmount =
  COMMISSION.TYPE === "PERCENT" ?
  Math.round((SERVICE_AMOUNT * COMMISSION.VALUE) / 100) :
  COMMISSION.VALUE;

const payable = SERVICE_AMOUNT;

// Render
$("amountText").innerText = SERVICE_AMOUNT;
$("commissionText").innerText = commissionAmount;
$("payableText").innerText = payable;

// Pay button (mock)
$("payBtn").onclick = () => {
  $("statusBox").innerText =
    "Payment successful. Commission credited to platform.";
};