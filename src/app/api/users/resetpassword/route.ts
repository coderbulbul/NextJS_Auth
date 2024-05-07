import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const email = reqBody.user.email;
    const token = reqBody.user.token;
    const password = reqBody.user.password;
    const confirmPassword = reqBody.user.confirmPassword;
    console.log(reqBody);

    //search user in db
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User no found" }, { status: 400 });
    }

    //check password is correct
    const validToken = token === user.forgotPasswordToken;

    const salt = await bcryptjs.genSalt(10);
    const newHashedPassword = await bcryptjs.hash(password, salt);

    //update password & save to database
    if (validToken) {
      user.password = newHashedPassword;
      user.forgotPasswordToken = undefined;
      user.forgotPasswordTokenExpiry = undefined;
      await user.save();
    } else {
      console.log("Unauthenticated user!!!");
      console.log(validPassword);
      return NextResponse.json({ message: "Invalid User" }, { status: 400 });
    }

    const response = NextResponse.json({
      message: "Password updated successfully",
      success: true,
      reqBody,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
