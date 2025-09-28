"use client";
import { createUserValidation } from "@/app/validation";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ErrorMessage } from "@/components/index";
import { Button, Callout, Spinner } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { InfoCircledIcon } from "@radix-ui/react-icons";
type RegisterFormData = z.infer<typeof createUserValidation>;
const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(createUserValidation),
  });
  return (
    <>
      {error && (
        <Callout.Root color="red" className="mb-2">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
          {/* Header */}
          <div className="text-center">
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
              Create new account account
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Or{" "}
              <Link
                href="/api/auth/signin"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                sign in if you already have an account
              </Link>
            </p>
          </div>

          {/* Credentials form */}
          <form
            className="mt-6 space-y-4"
            onSubmit={handleSubmit(async (data) => {
              try {
                await axios.post("/api/user", data);
                router.push("/api/auth/signin");
              } catch (error) {
                setError(`Unexpected error ${error}`);
              }
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("email")}
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                {...register("name")}
                id="name"
                type="text"
                required
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                {...register("password")}
                id="password"
                type="password"
                required
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </div>
            <Button disabled={isSubmitting} type="submit" className="!w-full">
              Sign in {isSubmitting && <Spinner />}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
