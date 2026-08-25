// Paste your Cloudflare Worker URL here after deploying it.
const WORKER_URL = "YOUR_CLOUDFLARE_WORKER_URL";

function copyIP(){
  navigator.clipboard.writeText("prosmp.mcsh.io");
  alert("Server IP copied: prosmp.mcsh.io");
}

const params = new URLSearchParams(window.location.search);
const selected = params.get("rank");
const rankSelect = document.getElementById("rankSelect");
if (rankSelect && selected) rankSelect.value = selected;

async function submitApplication(type, form){
  const status = document.getElementById("status");
  if (WORKER_URL === "YOUR_CLOUDFLARE_WORKER_URL"){
    status.textContent = "⚠️ Website form is ready. Add your Cloudflare Worker URL in script.js.";
    return;
  }
  const data = Object.fromEntries(new FormData(form).entries());
  data.type = type;
  status.textContent = "Submitting...";
  try{
    const response = await fetch(WORKER_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
    const result = await response.json();
    status.textContent = result.success ? "✅ "+result.message : "❌ "+(result.message || "Submission failed");
    if(result.success) form.reset();
  }catch(e){
    status.textContent = "❌ Connection error. Check your Worker URL.";
  }
}

const staffForm=document.getElementById("staffForm");
const rankForm=document.getElementById("rankForm");
const mediaForm=document.getElementById("mediaForm");
if(staffForm)staffForm.addEventListener("submit",e=>{e.preventDefault();submitApplication("staff",staffForm)});
if(rankForm)rankForm.addEventListener("submit",e=>{e.preventDefault();submitApplication("rank",rankForm)});
if(mediaForm)mediaForm.addEventListener("submit",e=>{e.preventDefault();submitApplication("media",mediaForm)});