// elements
const locationSwitch = document.getElementById("locationSwitch");
const locationText = document.getElementById("locationText");

// links
const nextcloud = document.getElementById("nextcloud");
const jellyfin = document.getElementById("jellyfin");
const sesquipedalia = document.getElementById("sesquipedalia");
const npm = document.getElementById("npm");
const cadvisor = document.getElementById("cadvisor");
const grafana = document.getElementById("grafana");

// base IPs
const homeIP = "192.168.1.59";
const uniIP  = "192.168.0.59";  // change to whatever it is at uni

function updateLinks() {
  const baseIP = locationSwitch.checked ? uniIP : homeIP;
  locationText.textContent = locationSwitch.checked ? "Uni" : "Home";

  nextcloud.href = `http://${baseIP}:8080`;
  jellyfin.href = `http://${baseIP}:8096`;
  sesquipedalia.href = `http://${baseIP}:8084`;
  npm.href = `http://${baseIP}:81`;
  cadvisor.href = `http://${baseIP}:8081`;
  grafana.href = `http://${baseIP}:3000`;
}

// run on load
updateLinks();

// run when toggled
locationSwitch.addEventListener("change", updateLinks);