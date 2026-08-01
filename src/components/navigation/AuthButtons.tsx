import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthButtons = () => {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return <div className="h-9 w-24 bg-muted/50 animate-pulse rounded-md" />;
  }

  if (!isAuthenticated) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() =>
          loginWithRedirect({
            authorizationParams: {
              connection: "google-oauth2",     // force Google
              prompt: "select_account",        // always show chooser
              scope: "openid email profile offline_access",
              redirect_uri: window.location.origin, // must be in Allowed Callback URLs
            },
          })
        }
      >
        {/* Google 'G' icon (optional) */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" className="h-4 w-4">
          <path fill="#EA4335" d="M5.2662,9.7645 C6.1988,6.9386 8.8544,4.9091 12,4.9091 C13.6909,4.9091 15.2182,5.5091 16.4182,6.4909 L19.9091,3 C17.7818,1.1455 15.0545,0 12,0 C7.2701,0 3.1977,2.6983 1.24,6.65 L5.2662,9.7645 Z"/>
          <path fill="#34A853" d="M16.0407,18.0126 C14.9509,18.7163 13.5661,19.0909 12,19.0909 C8.8665,19.0909 6.2191,17.0769 5.277,14.2679 L1.2375,17.335 C3.1928,21.2936 7.265,24 12,24 C14.9328,24 17.7353,22.9574 19.8342,20.9996 L16.0407,18.0126 Z"/>
          <path fill="#4A90E2" d="M19.8342,20.9996 C22.0292,18.9521 23.4545,15.9037 23.4545,12 C23.4545,11.2909 23.3455,10.5273 23.1818,9.8182 L12,9.8182 L12,14.4545 L18.4364,14.4545 C18.1188,16.0136 17.2663,17.2212 16.0407,18.0126 L19.8342,20.9996 Z"/>
          <path fill="#FBBC05" d="M5.277,14.2679 C5.0383,13.5563 4.9091,12.7938 4.9091,12 C4.9091,11.2183 5.0344,10.4668 5.2662,9.7645 L1.24,6.65 C0.4366,8.2604 0,10.0754 0,12 C0,13.9195 0.4448,15.7302 1.2375,17.335 L5.277,14.2679 Z"/>
        </svg>
        Continue with Google
      </Button>
    );
  }

  return (
    <>
      {user?.picture && (
        <img
          src={String(user.picture)}
          alt={user.name || "User"}
          className="w-8 h-8 rounded-full border-2 border-primary/20"
        />
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          })
        }
      >
        Log out
      </Button>
    </>
  );
};
