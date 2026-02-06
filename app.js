// 🔗 BACKEND BASE URL (FINAL)
const API_BASE_URL = "https://indixa-backend-zlwm.onrender.com";

// ✅ CHECK BACKEND CONNECTION
function checkBackend() {
  fetch(API_BASE_URL)
    .then(res => res.json())
    .then(data => {
      showOutput(data);
    })
    .catch(err => {
      showOutput({ error: "Backend not reachable", details: err });
    });
}

// 👤 LOAD USERS FROM BACKEND
function loadUsers() {
  fetch(API_BASE_URL + "/api/users")
    .then(res => res.json())
    .then(data => {
      showOutput(data);
    })
    .catch(err => {
      showOutput({ error: "Users API failed", details: err });
    });
}

// 🔐 LOGIN API (DEMO)
function login() {
  fetch(API_BASE_URL + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      phone: "9999999999"
    })
  })
    .then(res => res.json())
    .then(data => {
      showOutput(data);
    })
    .catch(err => {
      showOutput({ error: "Login failed", details: err });
    });
}

// 🧾 OUTPUT HELPER
function showOutput(data) {
  document.getElementById("output").innerText =
    JSON.stringify(data, null, 2);
}
