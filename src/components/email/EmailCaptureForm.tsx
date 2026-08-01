
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Loader2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface EmailCaptureFormProps {
  onSubmit: (email: string) => Promise<void>;
  isSubmitting: boolean;
  buttonText: string;
  error: string | null;
}

export function EmailCaptureForm({ 
  onSubmit, 
  isSubmitting, 
  buttonText,
  error
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous validation errors
    setValidationError(null);
    
    // Validate email before submitting
    if (!email) {
      setValidationError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setValidationError('Please enter a valid email address');
      return;
    }
    
    await onSubmit(email);
    
    // Only clear the email if there was no error
    if (!error) {
      setEmail('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
      {(validationError || error) && (
        <Alert variant="destructive" className="py-2 w-full">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {validationError || error}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex flex-col w-full space-y-2">
        <div className="relative w-full">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // Clear validation error when user starts typing
              if (validationError) setValidationError(null);
            }}
            className={`pl-10 text-center ${(validationError || error) ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            disabled={isSubmitting}
            aria-invalid={!!(validationError || error)}
            required
          />
        </div>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="min-w-24 w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : buttonText}
        </Button>
      </div>
    </form>
  );
}

export default EmailCaptureForm;
