import decode from "jwt-decode";
import { cookies } from "next/headers";

interface User {
  sub: string;
  name: string;
  avatar_url: string;
}

export const getUserCredentials = (): User => {
  const token = cookies().get("token")?.value;

  if (!token) {
    throw new Error("Unauthenticated.");
  }

  const user = decode(token) satisfies User;

  return {
    ...user,
  };
};
