"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { logIn, singUp } from "@/actions/actions";
import AuthFormBtn from "./auth-form-btb";
import { useFormState } from "react-dom";

type AuthFormProps = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: AuthFormProps) {
  const [signUpError, dispatchSignUp] = useFormState(singUp, undefined);
  const [logInError, dispatchLogin] = useFormState(logIn, undefined);

  return (
    <form
      className="space-y-3"
      action={type === "login" ? dispatchLogin : dispatchSignUp}
    >
    
      <div className="space-y-2">
        <Label htmlFor="email"> Email </Label>
        <Input
          id="email"
          type="email"
          name="email"
          required
          maxLength={100}
          className="text-base font-medium max-w-full w-full h-12 bg-transparent rounded-lg mt-2"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password"> Password </Label>
        <Input
          id="password"
          type="password"
          name="password"
          required
          maxLength={100}
          className="text-base font-medium max-w-full w-full h-12 bg-transparent rounded-lg mt-2"
        />
      </div>
      <AuthFormBtn type={type} />
      {signUpError && (
        <p className="text-red-500 text-sm mt-2"> {signUpError.message} </p>
      )}
      {logInError && (
        <p className="text-red-500 text-sm mt-2"> {logInError.message} </p>
      )}
    </form>
  );
}
