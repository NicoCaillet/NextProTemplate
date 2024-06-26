"use client"
import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

type AuthFormBtnProps = {
  type: "login" | "signup";
};

function AuthFormBtn({ type }: AuthFormBtnProps) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} variant="primaryBtn">
      {type === "login" ? "Log In" : "Sign up"}
    </Button>
  );
}

export default AuthFormBtn;
