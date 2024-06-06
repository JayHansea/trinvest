import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Investment from "@/models/investmentModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    // make a dynamic endpoint, to be able to extract userId
    const userId = getDataFromToken(request);
    const investment = await Investment.findOne({ userId });
    return NextResponse.json({ message: "Investment found", data: investment });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
