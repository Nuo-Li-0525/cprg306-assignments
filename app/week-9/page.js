"use client";

import { useUserAuth } from "./_utils/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div className="p-2 m-2">
          <h1 className="text-4xl font-bold mb-5">Shopping List App</h1>
          <div className="text-lg">
            <p>
              Signed in as {user.displayName} ({user.email}).
            </p>
            <p>
              <button
                onClick={handleLogout}
                className="hover:text-teal-400 hover:underline"
              >
                Sign out
              </button>
            </p>
            <button
              onClick={() => router.push("/week-9/shopping-list")}
              className="hover:text-teal-400 hover:underline"
            >
              Continue to your Shopping List
            </button>
          </div>
        </div>
      ) : (
        <div className="p-2 m-2">
          <h1 className="text-4xl font-bold mb-5">Shopping List App</h1>
          <div className="text-lg">
            <button
              onClick={handleLogin}
              className="hover:text-teal-400 hover:underline"
            >
              Sign in with GitHub
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
