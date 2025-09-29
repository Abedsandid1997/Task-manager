import { taskUpdateValidation } from "@/app/validation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN")
    return NextResponse.json("Unauthorized", { status: 401 });
  const { id } = await params;

  const existingTask = await prisma.task.findUnique({
    where: {
      id,
    },
  });

  if (!existingTask)
    return NextResponse.json(
      { Message: "Task Could not been found" },
      { status: 400 }
    );

  await prisma.task.delete({
    where: { id },
  });
  return NextResponse.json(
    { Message: "Task has been deleted" },
    { status: 201 }
  );
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json("Unauthorized", { status: 401 });
  const id = (await params).id;
  const body = await request.json();
  const { status, priority, description, userId } = body;
  const validation = taskUpdateValidation.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error, { status: 400 });
  const existingTask = await prisma.task.findUnique({
    where: { id },
  });
  if (!existingTask)
    return NextResponse.json(
      { Message: "Task Could not been found" },
      { status: 400 }
    );
  await prisma.task.update({
    where: { id },
    data: {
      status,
      priority,
      description,
      userId,
    },
  });
  return NextResponse.json(
    { Message: "task has been updated" },
    { status: 201 }
  );
}
