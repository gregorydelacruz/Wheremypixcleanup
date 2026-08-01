import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUserUsage, updateUserPlan, resetUsage } from "@/utils/usageTracker";

// Access to this page is already gated by ProtectedAdminRoute, which requires an
// authenticated Auth0 session whose email matches VITE_ADMIN_EMAIL. Do NOT add a
// second in-code password check here — hardcoded secrets in client bundles are
// trivially recoverable and provide no real protection.
const Admin = () => {
  const [plan, setPlan] = useState(getUserUsage().userPlan);
  const [count, setCount] = useState(getUserUsage().count);

  const handleSetPlan = (plan: "free" | "pro" | "vip") => {
    updateUserPlan(plan);
    setPlan(plan);
  };

  const handleResetUsage = () => {
    resetUsage();
    setCount(0);
  };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center pt-20">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Plan Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-xs text-muted-foreground mb-4">
              These controls affect local test state only. Real plan and usage
              limits are enforced server-side against your subscription record.
            </p>
            <div className="mb-4">
              <div className="font-semibold mb-2 text-base">Plan Management</div>
              <div className="space-x-2 mb-2">
                <Button
                  variant={plan === "free" ? "default" : "outline"}
                  onClick={() => handleSetPlan("free")}
                >Set Free</Button>
                <Button
                  variant={plan === "pro" ? "default" : "outline"}
                  onClick={() => handleSetPlan("pro")}
                >Set Pro</Button>
                <Button
                  variant={plan === "vip" ? "default" : "outline"}
                  onClick={() => handleSetPlan("vip")}
                >Set VIP</Button>
              </div>
              <span className="text-sm text-muted-foreground">Current plan: <b>{plan}</b></span>
            </div>
            <div className="mt-8">
              <div className="font-semibold mb-2 text-base">Usage Management</div>
              <Button
                variant="destructive"
                onClick={handleResetUsage}
              >Reset Usage</Button>
              <span className="text-sm text-muted-foreground block mt-2">
                Current usage: <b>{count}</b> images processed
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Admin;
