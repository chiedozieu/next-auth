import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connectDB()

export async function GET(request: NextRequest) {
    try {
       const userId = getDataFromToken(request)
       const user = await User.findById({_id: userId}).select("-password")
       return NextResponse.json({data: user}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}