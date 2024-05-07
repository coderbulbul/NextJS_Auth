import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    //use nodemailer
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b057fcb9ea978b",
        pass: "6a53e14c64bb8a",
      },
    });

    // create mail options
    const mailOptions = {
      from: "bulbul@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset your password",
      html: `<p>Click <a href="${
        emailType === "VERIFY"
          ? process.env.DOMAIN + "/verifyemail?token=" + hashedToken
          : process.env.DOMAIN + "/resetpassword?token=" + hashedToken
      }" here </a> to ${
        emailType === "Verify" ? "verify your email" : "Reset your password"
      }</p> or copy paste this link in the browser </hr> ${
        emailType === "VERIFY"
          ? process.env.DOMAIN + "/verifyemail?token=" + hashedToken
          : process.env.DOMAIN + "/resetpassword?token=" + hashedToken
      }
      `,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
