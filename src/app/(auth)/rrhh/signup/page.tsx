import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main>
      <H1 className="text-center">Sign Up as a Recruiter</H1>
      <AuthForm type="signup"/>
      <p className="flex items-center gap-x-1 mt-2">
        Already have an account?
        <Link href="/rrhh/login" className="text-sm text-zinc-500">
          Log In
        </Link>
      </p>
    </main>
  );
}
