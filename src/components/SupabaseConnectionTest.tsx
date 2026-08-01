import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function SupabaseConnectionTest() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Testing Supabase connection...');
        const { data, error } = await supabase.from('profiles').select('count').limit(1);
        console.log('Supabase test result:', { data, error });
        
        if (error) {
          console.error('Supabase connection error:', error);
          setError(error.message);
          setStatus('error');
        } else {
          console.log('Supabase connected successfully');
          setStatus('connected');
        }
      } catch (err) {
        console.error('Supabase connection exception:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setStatus('error');
      }
    };

    testConnection();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {status === 'checking' && <Loader2 className="h-5 w-5 animate-spin" />}
          {status === 'connected' && <CheckCircle className="h-5 w-5 text-green-600" />}
          {status === 'error' && <XCircle className="h-5 w-5 text-red-600" />}
          Supabase Connection
        </CardTitle>
      </CardHeader>
      <CardContent>
        {status === 'checking' && <p>Testing connection...</p>}
        {status === 'connected' && <p className="text-green-600">✅ Connected successfully!</p>}
        {status === 'error' && (
          <div>
            <p className="text-red-600">❌ Connection failed</p>
            {error && <p className="text-sm text-gray-600 mt-1">{error}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}