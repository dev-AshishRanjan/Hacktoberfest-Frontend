let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let generateButton = document.getElementById("generateButton");

function generateQr() {
  if (qrText.value.length > 0) {
    qrImage.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
      qrText.value;

    imgBox.classList.add("show-img");

    // Change the button text to "Download" and add a download function
    generateButton.innerHTML = "⬇️ Download";
    generateButton.onclick = downloadQrCode;

    // Clear the QR code and input field after 2 minutes
    setTimeout(() => {
      qrImage.src = "";
      imgBox.classList.remove("show-img");
      qrText.value = "";
      generateButton.innerHTML = "⚡Generate QR Code";
      generateButton.onclick = generateQr;
    }, 10000); // 10,000 milliseconds = 10 seconds
  } else {
    qrText.classList.add("error");
    setTimeout(() => {
      qrText.classList.remove("error");
    }, 1000);
  }
}

function downloadQrCode() {
  if (qrImage.src) {
    const text = qrText.value;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", qrImage.src, true);
    xhr.responseType = "blob";

    xhr.onload = function () {
      const blob = xhr.response;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      // Set the download name to the text entered in the input field
      a.download = text ? `${text}.png` : "qrcode.png";

      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Reset the button text and behavior
      generateButton.innerHTML = "⚡Generate QR Code";
      generateButton.onclick = generateQr;

      // Remove the QR code image
      qrImage.src = "";
      imgBox.classList.remove("show-img");

      // Clear the input field
      qrText.value = "";
    };

    xhr.send();
  }
}
