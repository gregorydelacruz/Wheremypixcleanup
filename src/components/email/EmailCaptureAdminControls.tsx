
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { getEmailsFromLocalStorage } from '@/utils/localStorageOperations';

interface EmailCaptureAdminControlsProps {
  emailCount: number;
  onResetForm: () => void;
}

const EmailCaptureAdminControls = ({ 
  emailCount, 
  onResetForm 
}: EmailCaptureAdminControlsProps) => {
  
  const handleDownloadEmails = () => {
    const emails = getEmailsFromLocalStorage();
    const content = emails.map(record => `${record.email},${record.timestamp}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `captured_emails_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <div className="mt-4 flex flex-col space-y-2">
      <div className="flex justify-between items-center text-xs text-muted-foreground border-t pt-4">
        <span>{emailCount} email{emailCount !== 1 ? 's' : ''} captured</span>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1" 
            onClick={handleDownloadEmails}
          >
            <Download className="h-3 w-3" />
            Download
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1" 
            onClick={onResetForm}
          >
            <RefreshCw className="h-3 w-3" />
            Reset Form
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Admin panel: You can download emails or reset the form state.
      </p>
    </div>
  );
};

export default EmailCaptureAdminControls;
