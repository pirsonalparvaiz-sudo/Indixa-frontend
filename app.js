const status = document.getElementById("locationStatus");
const btn = document.getElementById("detectBtn");

btn.addEventListener("click", () => {
  status.innerText = "📍 Detecting location...";
  
  if (!navigator.geolocation) {
    status.innerText = "❌ Location not supported";
    return;
  }
  
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      
      status.innerText = `✅ Location found`;
      console.log("LAT:", lat, "LNG:", lng);
      
      window.APP_STATE = { lat, lng };
    },
    (err) => {
      status.innerText = "⚠️ Location permission denied";
      console.error(err);
    },
    {
      enableHighAccuracy: true,
      timeout: 15000
    }
  );
});