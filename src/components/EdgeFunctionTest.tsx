import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EdgeFunctionTest() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const testEdgeFunction = async () => {
    setTesting(true);
    setResult(null);
    setError(null);

    try {
      // Create a small test image (1x1 red pixel)
      const testImage = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
      
      console.log('Testing OpenAI edge function...');
      
      const { data, error } = await supabase.functions.invoke('analyze-image', {
        body: {
          base64Image: testImage
        }
      });

      console.log('Edge function response:', { data, error });

      if (error) {
        setError(`Edge function error: ${error.message}`);
      } else if (data?.description) {
        setResult(`✅ Success: ${data.description}`);
      } else {
        setError('No description returned from edge function');
      }
    } catch (err) {
      console.error('Test failed:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>OpenAI Edge Function Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={testEdgeFunction}
          disabled={testing}
          className="w-full"
        >
          {testing ? 'Testing...' : 'Test Image Analysis'}
        </Button>
        
        {result && (
          <div className="p-3 bg-green-100 text-green-800 rounded">
            {result}
          </div>
        )}
        
        {error && (
          <div className="p-3 bg-red-100 text-red-800 rounded">
            ❌ {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}