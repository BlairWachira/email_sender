from flask import Flask,render_template,request,jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app =Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/send", methods=["POST"])
def send_email():
    sender_email=request.form["sender_email"]
    app_password=request.form["app_password"]
    recipients=request.form["recipients"]
    subject=request.form["subject"]
    message=request.form["message"]

    recipient_list = [email.strip() for email in recipients.split(",")]
    try:
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login(sender_email, app_password)

        for email in recipient_list:
            msg = MIMEMultipart()
            msg["From"] = sender_email
            msg["To"] = email
            msg["Subject"] = subject
            msg.attach(MIMEText(message, "plain"))

            server.sendmail(sender_email, email, msg.as_string())
        server.quit()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
    
@app.route("/get_password")
def get_password():
    return render_template("get_password.html")      

if __name__ == "__main__":
    app.run(debug=True)