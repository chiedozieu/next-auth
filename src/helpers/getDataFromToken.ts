import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: string;
  email?: string;
}

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as DecodedToken;
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
