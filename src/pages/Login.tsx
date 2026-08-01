// src/pages/Login.tsx
import { useEffect, useRef } from "react";
import { useAuth } from "@/auth/useAuth";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const fired = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !fired.current) {
      fired.current = true;      // prevent double-calls in StrictMode
      login();                   // hand off to Auth0 hosted page
    }
  }, [isAuthenticated, login]);

  return null; // no UI
}
