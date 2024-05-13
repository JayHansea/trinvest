import { NextRequest, NextResponse } from "next/server";
import Investment from "@/models/investmentModel";
import { connect } from "@/dbConfig/dbConfig";

connect();
