import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUserPlan } from "@/utils/usageTracker";
import { useAuth } from "@/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VIP_PROMO_PASSWORD = "vip-access-2025";

const VipSignup = () => {
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === VIP_PROMO_PASSWORD) {
      setIsAuthed(true);
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleClaimVip = () => {
    if (!isAuthenticated) {
      toast.info("Please sign in first to claim your VIP access");
      login();
      return;
    }

    updateUserPlan("vip");
    toast.success("Welcome to VIP! 🎉", {
      description: "You now have access to 100,000 images per month"
    });
    navigate("/upload");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Exclusive VIP Access</CardTitle>
          <CardDescription>
            {!isAuthed 
              ? "Enter the password to unlock VIP membership" 
              : "Claim your free VIP access"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isAuthed ? (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Access Password
                </label>
                <Input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
              <Button type="submit" className="w-full">
                Unlock VIP Access
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="font-semibold">VIP Membership Includes:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Process up to 100,000 images per month</li>
                  <li>Advanced image categorization</li>
                  <li>Priority support</li>
                  <li>Batch processing</li>
                </ul>
              </div>
              
              {isAuthenticated ? (
                <Button onClick={handleClaimVip} className="w-full">
                  Activate VIP Membership
                </Button>
              ) : (
                <Button onClick={() => login()} className="w-full">
                  Sign In to Claim VIP
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VipSignup;
