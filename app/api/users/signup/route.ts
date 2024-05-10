import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { firstname, lastname, username, email, password, confirmpassword } =
      reqBody;

    console.log(reqBody);

    // check if user already exists
    const alreadyExistingUser = await User.findOne({ email });

    if (alreadyExistingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json(
      { message: "User created successfully", success: true, savedUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
