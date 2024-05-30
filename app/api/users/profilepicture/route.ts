import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { image } = reqBody;
  } catch (error: any) {
    console.error("Update profile picture failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
