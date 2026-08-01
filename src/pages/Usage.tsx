
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUserUsage, USAGE_LIMITS } from "@/utils/usageTracker";
import UsageDisplay from "@/components/UsageDisplay";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/auth/useAuth";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Footer from "@/components/Footer";

const UsagePage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const usage = getUserUsage();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Usage - Where My Pix</title>
        </Helmet>
      </HelmetProvider>
    
      <main className="container max-w-4xl mx-auto pt-28 px-4 pb-20">
        <h1 className="text-3xl font-bold mb-8">Usage Statistics</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan: {usage.userPlan.toUpperCase()}</CardTitle>
              <CardDescription>
                Your monthly image processing allowance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UsageDisplay />
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate("/pricing")}
              >
                Upgrade Plan
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Usage History</CardTitle>
              <CardDescription>
                Current period: {usage.currentPeriod}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Your image processing summary</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Total images processed</TableCell>
                    <TableCell className="text-right">{usage.count}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Monthly limit</TableCell>
                    <TableCell className="text-right">{USAGE_LIMITS[usage.userPlan]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remaining</TableCell>
                    <TableCell className="text-right">{USAGE_LIMITS[usage.userPlan] - usage.count}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UsagePage;
