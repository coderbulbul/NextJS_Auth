import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    console.log(reqBody);

    //find user id
    const user = await User.findOne({ email });
    console.log(user);

    //if user found in database send mail to mailtrap otherwise show user not match
    if (user) {
      await sendEmail({ email, emailType: "RESET", userId: user._id });
    } else {
      return NextResponse.json({ error: "Email not match" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const response = NextResponse.json({
    message: "Mail search Successfully",
    success: true,
  });

  return response;
}
