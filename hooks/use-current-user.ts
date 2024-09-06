import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const { data: session, status } = useSession();

  // If session is still loading, return undefined
  if (status === "loading") {
    return undefined;
  }

  // Return the user object from the session, or undefined if no user is logged in
  return session?.user || undefined;
};
