
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw } from 'lucide-react';
import { useAuth } from '@/auth/useAuth';

interface ApiVerificationProps {
  className?: string;
}

export function ApiVerification({ className }: ApiVerificationProps) {
  const [apiStatus, setApiStatus] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Array<{ endpoint: string, status: string, success: boolean, environment?: string, message?: string }>>([]);
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();
  const { getToken } = useAuth();

  // Function to test API endpoint
  const testApiEndpoint = async () => {
    setApiStatus('Checking API endpoints...');
    setTestResults([]);
    setIsTesting(true);
    
    // Test both API endpoints: the production one first, then development
    const endpoints = [
      '/public/api/update-emails-file', // Production API
      '/api/update-emails-file'        // Development API
    ];
    
    const results = [];
    
    // Get auth token if available
    let token = null;
    try {
      token = await getToken();
    } catch (error) {
      console.log('No token available or error getting token:', error);
    }
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Testing API endpoint: ${endpoint}`);
        const headers: Record<string, string> = {
          'Cache-Control': 'no-store'
        };
        
        // Add auth token if available
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(endpoint, {
          method: 'HEAD',
          headers,
          cache: 'no-store', // Prevent caching
        });
        
        let environment = 'unknown';
        let message = '';
        
        // Try to parse JSON response to get environment info
        try {
          const data = await response.json();
          environment = data.environment || 'unknown';
          message = data.message || '';
        } catch (e) {
          console.log(`Could not parse JSON from ${endpoint} HEAD response`);
          try {
            const text = await response.text();
            message = text || '';
          } catch (textError) {
            console.log(`Could not get text from ${endpoint} HEAD response`);
          }
        }
        
        const result = {
          endpoint,
          status: `${response.status} ${response.statusText}`,
          success: response.ok,
          environment,
          message
        };
        
        results.push(result);
        console.log(`API test result for ${endpoint}:`, result);
        
      } catch (error) {
        results.push({
          endpoint,
          status: `Error: ${error instanceof Error ? error.message : String(error)}`,
          success: false,
          environment: 'error',
          message: error instanceof Error ? error.message : String(error)
        });
        console.error(`Error testing ${endpoint}:`, error);
      }
    }
    
    setTestResults(results);
    
    const successfulEndpoints = results.filter(r => r.success);
    if (successfulEndpoints.length > 0) {
      setApiStatus(`${successfulEndpoints.length} API endpoint(s) available ✅`);
      toast({
        title: "API Check",
        description: `${successfulEndpoints.length} API endpoint(s) are accessible`,
      });
    } else {
      setApiStatus(`No API endpoints are accessible ❌`);
      toast({
        title: "API Check Failed",
        description: "No API endpoints are accessible",
        variant: "destructive"
      });
    }
    
    setIsTesting(false);
  };

  return (
    <div className={`mt-4 pt-4 border-t border-accent/50 ${className}`}>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Verify API endpoints:</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={testApiEndpoint} 
            className="text-xs flex items-center gap-1"
            disabled={isTesting}
          >
            <RefreshCw className={`h-3 w-3 ${isTesting ? 'animate-spin' : ''}`} />
            Test Connection
          </Button>
        </div>
        
        {apiStatus && (
          <p className={`text-xs ${apiStatus.includes('❌') ? 'text-destructive' : 'text-green-600'}`}>
            {apiStatus}
          </p>
        )}
        
        {testResults.length > 0 && (
          <div className="text-xs space-y-1 mt-1">
            {testResults.map((result, index) => (
              <Alert key={index} variant={result.success ? "default" : "destructive"} className="py-1">
                <AlertDescription className="text-xs">
                  <div className="flex justify-between">
                    <span>{result.endpoint}</span>
                    <span>{result.status}</span>
                  </div>
                  {result.environment && result.success && (
                    <div className="text-xs mt-1 text-muted-foreground">
                      Environment: {result.environment}
                      {result.message && (
                        <span className="ml-1">- {result.message}</span>
                      )}
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ApiVerification;
