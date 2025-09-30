"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { providerMap } from "@/auth.config";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

const SIGNIN_ERROR_URL = "/signin";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCredentialsSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string).toLowerCase();
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/");
      } else {
        setError(result?.error ?? "CredentialsSignin");
      }
    } catch (err) {
      console.error(err);
      setError("UnexpectedError");
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSignIn = async (providerId: string) => {
    try {
      await signIn(providerId, { redirectTo: "/" });
    } catch (err) {
      console.error(err);
      router.push(`${SIGNIN_ERROR_URL}?error=ProviderSignin`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Or{" "}
            <Link
              href="/users/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </Link>
          </p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Credentials form */}
        <form onSubmit={handleCredentialsSignIn} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <Button type="submit" className="!w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        {/* Divider */}
        {Object.values(providerMap).length > 0 && (
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
        )}

        {/* Social providers */}
        <div className="grid gap-3">
          {Object.values(providerMap).map((provider) => (
            <Button
              key={provider.id}
              className="!w-full"
              onClick={() => handleProviderSignIn(provider.id)}
            >
              Sign in with {provider.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
