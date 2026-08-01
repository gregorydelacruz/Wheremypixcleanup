
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AlreadySubscribedView = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center p-4 bg-primary/10 rounded-md">
      <div className="flex justify-center mb-2">
        <CheckCircle2 className="h-8 w-8 text-primary" />
      </div>
      <p className="text-sm font-medium">You're already subscribed!</p>
      <p className="text-xs text-muted-foreground mt-1 mb-3">Thank you for being part of our community.</p>
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-2 flex items-center gap-2" 
        onClick={() => navigate('/signup')}
      >
        <img src="/google-logo.png" alt="Google" className="w-4 h-4" />
        Login with Google
      </Button>
    </div>
  );
};

export default AlreadySubscribedView;
