import { taskValidation } from "@/app/validation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json("Unauthorized", { status: 401 });
  const body = await request.json();
  const validation = taskValidation.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error, { status: 400 });
  const { title, description } = body;
  const task = await prisma.task.create({
    data: {
      title,
      description,
    },
  });
  return NextResponse.json(
    { message: "Task has been created", task },
    { status: 201 }
  );
}

export async function GET(request: NextRequest) {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const task = await prisma.task.update({
    where: { id: body.id },
    data: {
      priority: body.priority,
    },
  });
  return NextResponse.json(
    { message: "Task has been created", task },
    { status: 201 }
  );
}
