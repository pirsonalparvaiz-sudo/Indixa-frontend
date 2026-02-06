import { CONFIG } from "../config/config.js";
import { STATE } from "../core/state.js";
import { $ } from "../core/utils.js";

const chatBox = $("chatBox");
const input = $("chatInput");
const sendBtn = $("sendBtn");
const langSelect = $("langSelect");

// Init language
langSelect.value = STATE.user.language;

// Language change
langSelect.onchange = () => {
  STATE.user.language = langSelect.value;
  systemMsg(getText("LANG_CHANGED"));
};

// Send message
sendBtn.onclick = sendMessage;
input.onkeydown = e => {
  if (e.key === "Enter") sendMessage();
};

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  
  userMsg(text);
  input.value = "";
  
  // MOCK AI RESPONSE (provider independent)
  setTimeout(() => {
    aiMsg(mockAI(text, STATE.user.language));
  }, 500);
}

// UI helpers
function userMsg(text) {
  chatBox.innerHTML += `<div class="card"><b>You:</b> ${text}</div>`;
}

function aiMsg(text) {
  chatBox.innerHTML += `<div class="card"><b>AI:</b> ${text}</div>`;
}

function systemMsg(text) {
  chatBox.innerHTML += `<div class="card"><i>${text}</i></div>`;
}

// Language texts (LOCKED)
function getText(key) {
  const dict = {
    LANG_CHANGED: {
      en: "Language changed",
      hi: "भाषा बदल दी गई",
      ur: "زبان تبدیل ہو گئی",
      bn: "ভাষা পরিবর্তন হয়েছে",
      ta: "மொழி மாற்றப்பட்டது",
      te: "భాష మార్చబడింది",
    },
  };
  return dict[key][STATE.user.language] || dict[key].en;
}

// MOCK AI brain (LOCKED)
function mockAI(text, lang) {
  const replies = {
    en: "I understand your request. A service provider will be suggested.",
    hi: "मैं आपकी बात समझ गया हूँ। सेवा प्रदाता सुझाया जाएगा।",
    ur: "میں آپ کی بات سمجھ گیا ہوں۔ سروس فراہم کرنے والا تجویز کیا جائے گا۔",
    bn: "আমি আপনার অনুরোধ বুঝেছি। সেবা প্রদানকারী প্রস্তাব করা হবে।",
    ta: "உங்கள் கோரிக்கையை நான் புரிந்துகொண்டேன்.",
    te: "మీ అభ్యర్థన నాకు అర్థమైంది.",
  };
  return replies[lang] || replies.en;
}