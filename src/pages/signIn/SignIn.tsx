import React from "react";
import { UserLayout } from "../../layouts/userLayout";
import { SignInForm } from "./SignInForm";

export const SignIn: React.FC = (props) => {
  return (
    <UserLayout>
      <SignInForm />
    </UserLayout>
  );
};
