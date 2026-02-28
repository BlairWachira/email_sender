document.getElementById("emailForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const senderEmail = document.getElementById("sender_email").value.trim();
  const appPassword = document.getElementById("app_password").value.trim();
  const recipients = document.getElementById("recipients").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!senderEmail || !appPassword || !recipients || !subject || !message) {
    Swal.fire({
      icon: "warning",
      title: "Missing Fields",
      text: "Please fill in all fields before sending."
    });
    return;
  }

  Swal.fire({
    title: "Sending...",
    text: "Please wait while emails are being sent.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  const formData = new FormData(this);

  fetch("/send", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Emails sent successfully"
        });
        document.getElementById("emailForm").reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message
        });
      }
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong."
      });
    });
});