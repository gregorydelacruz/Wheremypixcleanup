
import { Progress } from "@/components/ui/progress";
import { getUserUsage, USAGE_LIMITS } from "@/utils/usageTracker";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UsageDisplay = () => {
  const usage = getUserUsage();
  const limit = USAGE_LIMITS[usage.userPlan];
  const usagePercentage = Math.min(Math.round((usage.count / limit) * 100), 100);
  const navigate = useNavigate();
  
  // Show upgrade message if usage is over 80%
  const isNearLimit = usagePercentage >= 80;
  
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          {usage.count} / {limit} images
        </span>
        <span className={`font-medium ${usagePercentage > 90 ? "text-destructive" : ""}`}>
          {usagePercentage}%
        </span>
      </div>
      
      <Progress 
        value={usagePercentage} 
        className="h-2" 
        // Change color based on usage percentage
        indicatorClassName={usagePercentage > 90 ? "bg-destructive" : ""}
      />
      
      <p className="text-xs text-muted-foreground">
        Usage resets monthly. Current period: {usage.currentPeriod}
      </p>
      
      {isNearLimit && (
        <Alert className="mt-4 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
          <Info className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="flex flex-col space-y-2">
            <span>You're approaching your monthly usage limit.</span>
            <Button 
              size="sm" 
              onClick={() => navigate("/pricing")} 
              className="self-start mt-1 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600"
            >
              Upgrade Plan
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default UsageDisplay;
