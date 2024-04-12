import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { logIn, singUp } from "@/actions/actions";

type AuthFormProps = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: AuthFormProps) {
  return (
    <form className="space-y-3" action={type === 'login' ? logIn : singUp}>
      <div className="space-y-2">
        <Label htmlFor="email"> Email </Label>
        <Input id="email" type="email" name="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password"> Password </Label>
        <Input id="password" type="password" name="password"/>
      </div>
      <Button> {type === "login" ? "Log In" : "Sign up"} </Button>
    </form>
  );
}
