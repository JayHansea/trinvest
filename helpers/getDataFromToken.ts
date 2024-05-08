import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest): string => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as JwtPayload;
    if (typeof decodedToken !== "string" && decodedToken.id) {
      return decodedToken.id;
    } else {
      throw new Error("Invalid token format");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
