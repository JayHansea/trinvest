import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Investment from "@/models/investmentModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      confirmpassword,
      image,
    } = reqBody;

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

    // create user collection
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
      image,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // create investment collection
    const newInvestment = new Investment({
      userId: savedUser._id,
      walletBalance: 0.0,
      depositAmount: 0.0,
      interest: 0.0,
      percentageInterest: 0.0,
      previousWithdrawal: 0.0,
      totalWithdrawal: 0.0,
      plan: "No plan yet",
      bitcoinWalletAddress: "",
    });

    const savedInvestment = await newInvestment.save();
    console.log(savedInvestment);

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
