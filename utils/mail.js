"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequestApproval = exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
    },
    from: "irochibuzor@gmail.com",
});
function sendMail(subject, toEmail, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: { name: `${toEmail}`, address: toEmail },
            subject: "Stavmia",
            html: myInvitation(toEmail, token),
        };
        transporter.sendMail(mailOptions, function (error) {
            if (error) {
                return { error: "Email not sent" };
            }
            else {
                return { message: "Email Sent" };
            }
        });
    });
}
exports.sendMail = sendMail;
function sendRequestApproval(toEmail, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: { name: `${toEmail}`, address: toEmail },
            subject: "Stavmia Edit Approval",
            html: approvedEmail(toEmail, token),
        };
        transporter.sendMail(mailOptions, function (error) {
            if (error) {
                return { error: "Email not sent" };
            }
            else {
                return { message: "Email Sent" };
            }
        });
    });
}
exports.sendRequestApproval = sendRequestApproval;
const myInvitation = (email, token) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <title>Stavmia</title>
</head>

<body style="padding: 40px; 
    color: #344054; 
    font-family: Inter; 
    margin: 0 auto; 
    font-size: 16px;
    max-width: 570px;
    background-color: #fff;">
    <div>
        <div 
            style="display: flex;
            align-items: center;
            gap: 10px;
            font-size: 24px;
            font-weight: 600;">
            <img src="https://stavmia-bucket.nyc3.cdn.digitaloceanspaces.com/StavmiaLogo.png" alt="" style="height: 50px;">
            </div>
            <div style="margin-top: 10px">Invitation</div>

        <div style="margin-top: 64px;
        margin-bottom: 24px;">
            <p>Hi ${email}</p>
            <p>You have been invited to be an admin on the Stavmia Portal. Click the link below to join or ignore if this is not for you</p>
        </div>

        <a href="${process.env.FRONTEND + "/register/" + token}">
            <button 
            style="background-color: #329632;
            border-radius: 8px;
            border: 1px solid  #329632;
            box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
            padding: 10px 18px;
            color: #fff;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;">Register Now</button>
        </a>

        <div class="bottom-text" style="margin-top: 20px;">
            <p style="margin: 0;">Thanks,</p>
            <p style="margin: 0;">The Team</p>
        </div>
    
    </div>

    <script>
        // JavaScript code to set the current year
        const currentYear = new Date().getFullYear();
        document.getElementById('currentYear').innerText = currentYear;
      </script>
    
    
</body>
</html>
  `;
};
const approvedEmail = (email, token) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <title>Stavmia</title>
</head>

<body style="padding: 40px; 
    color: #344054; 
    font-family: Inter; 
    margin: 0 auto; 
    font-size: 16px;
    max-width: 570px;
    background-color: #fff;">
    <div>
        <div 
            style="display: flex;
            align-items: center;
            gap: 10px;
            font-size: 24px;
            font-weight: 600;">
            <img src="https://stavmia-bucket.nyc3.cdn.digitaloceanspaces.com/StavmiaLogo.png" alt="" style="height: 50px;">
            </div>
            <div style="margin-top: 10px">Edit approved</div>

        <div style="margin-top: 64px;
        margin-bottom: 24px;">
            <p>Dear ${email}</p>
            <p>Click this link to edit your innovation:  <a href="${process.env.APPURL + "/edit/" + token}">link</a>. This link expires in 5 days.</p>
            <p>Your update will be evaluated for approval afterwards. Thank you for your contribution to STAVMiA.</p>
        </div>

        <a href="${process.env.APPURL + "/edit/" + token}">
            <button 
            style="background-color: #329632;
            border-radius: 8px;
            border: 1px solid  #329632;
            box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
            padding: 10px 18px;
            color: #fff;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;">Edit Now</button>
        </a>
    
    </div>

    <script>
        // JavaScript code to set the current year
        const currentYear = new Date().getFullYear();
        document.getElementById('currentYear').innerText = currentYear;
      </script>
    
    
</body>
</html>
  `;
};
