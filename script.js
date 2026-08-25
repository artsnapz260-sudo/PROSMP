// ==========================================
// PRO SMP CLOUDFLARE WORKER URLs
// ==========================================

const STAFF_WORKER_URL = "https://staff.bs8723201.workers.dev/";
const RANK_WORKER_URL = "https://rank.bs8723201.workers.dev/";
const MEDIA_WORKER_URL = "https://media.bs8723201.workers.dev/";


// ==========================================
// COPY SERVER IP
// ==========================================

function copyIP() {
  navigator.clipboard.writeText("prosmp.mcsh.io");

  alert("Server IP copied: prosmp.mcsh.io");
}


// ==========================================
// AUTO SELECT RANK FROM RANKS PAGE
// ==========================================

const params = new URLSearchParams(window.location.search);
const selectedRank = params.get("rank");

const rankSelect = document.getElementById("rankSelect");

if (rankSelect && selectedRank) {
  rankSelect.value = selectedRank;
}


// ==========================================
// SEND FORM TO WORKER
// ==========================================

async function submitApplication(workerUrl, form) {
  const status = document.getElementById("status");

  const data = Object.fromEntries(
    new FormData(form).entries()
  );

  status.textContent = "⏳ Submitting...";

  try {
    const response = await fetch(workerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      status.textContent = "✅ " + result.message;
      form.reset();
    } else {
      status.textContent = "❌ " + (result.message || "Submission failed");
    }

  } catch (error) {
    console.error(error);

    status.textContent =
      "❌ Connection error. Please try again later.";
  }
}


// ==========================================
// STAFF APPLICATION
// ==========================================

const staffForm = document.getElementById("staffForm");

if (staffForm) {
  staffForm.addEventListener("submit", function(event) {
    event.preventDefault();

    submitApplication(
      STAFF_WORKER_URL,
      staffForm
    );
  });
}


// ==========================================
// RANK BUY APPLICATION
// ==========================================

const rankForm = document.getElementById("rankForm");

if (rankForm) {
  rankForm.addEventListener("submit", function(event) {
    event.preventDefault();

    submitApplication(
      RANK_WORKER_URL,
      rankForm
    );
  });
}


// ==========================================
// MEDIA APPLICATION
// ==========================================

const mediaForm = document.getElementById("mediaForm");

if (mediaForm) {
  mediaForm.addEventListener("submit", function(event) {
    event.preventDefault();

    submitApplication(
      MEDIA_WORKER_URL,
      mediaForm
    );
  });
}
