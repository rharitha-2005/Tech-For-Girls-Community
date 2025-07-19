let shareCount = localStorage.getItem("shareCount") || 0;
const shareButton = document.getElementById("whatsappShare");
const shareCountDisplay = document.getElementById("shareCount");
const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

updateShareCountDisplay();

shareButton.addEventListener("click", () => {
  if (shareCount < 5) {
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const url = `https://wa.me/?text=${message}`;
    window.open(url, "_blank");

    shareCount++;
    localStorage.setItem("shareCount", shareCount);
    updateShareCountDisplay();

    if (shareCount == 5) {
      alert("Sharing complete. Please continue.");
    }
  }
});

function updateShareCountDisplay() {
  shareCountDisplay.textContent = `Click count: ${shareCount}/5`;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (shareCount < 5) {
    alert("Please complete WhatsApp sharing before submitting.");
    return;
  }

  const formData = new FormData(form);

  // Upload file
  const uploadRes = await fetch(
    "https://script.google.com/macros/s/YOUR_DEPLOYED_WEBAPP_URL/exec?action=upload",
    {
      method: "POST",
      body: formData,
    }
  );
  const fileUrl = await uploadRes.text();

  // Send form data
  const dataToSend = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    college: formData.get("college"),
    fileUrl: fileUrl,
  };

  await fetch(
    "https://script.google.com/macros/s/YOUR_DEPLOYED_WEBAPP_URL/exec?action=save",
    {
      method: "POST",
      body: JSON.stringify(dataToSend),
    }
  );

  form.querySelectorAll("input, button").forEach((el) => (el.disabled = true));
  successMessage.classList.remove("hidden");
  localStorage.setItem("formSubmitted", "true");
});

window.addEventListener("load", () => {
  if (localStorage.getItem("formSubmitted") === "true") {
    form.querySelectorAll("input, button").forEach((el) => (el.disabled = true));
    successMessage.classList.remove("hidden");
  }
});
