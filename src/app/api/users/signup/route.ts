import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectDB();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;
    console.log("reqBody", reqBody);

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
    }
    // if (password.length < 6) {
    //   return NextResponse.json(
    //     { error: "Password must be at least 6 characters" },
    //     { status: 400 }
    //   );
    // }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    console.log("newUser", newUser);

    return NextResponse.json({ 
        message: "User Created",
        success: true,
        newUser
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
