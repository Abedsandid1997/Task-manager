import { createUserValidation } from "@/app/validation";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { Message: "Users could not been fetched", error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createUserValidation.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error, { status: 400 });
  const { password, name, email } = body;
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser)
    return NextResponse.json(
      { Message: "User already exist" },
      { status: 401 }
    );
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, name, hashedPassword },
  });
  return NextResponse.json(user.email, { status: 201 });
}
