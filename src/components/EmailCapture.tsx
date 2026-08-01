
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { subscribeToMailchimp } from '@/utils/mailchimpSubscription';
import EmailCaptureForm from '@/components/email/EmailCaptureForm';
import EmailCaptureTitleSection from '@/components/email/EmailCaptureTitleSection';
import EmailCaptureAdminControls from '@/components/email/EmailCaptureAdminControls';
import AlreadySubscribedView from '@/components/email/AlreadySubscribedView';
import SubmissionProgress from '@/components/email/SubmissionProgress';
import useKeyboardShortcut from '@/hooks/useKeyboardShortcut';
import { getEmailsFromLocalStorage, isEmailAlreadySubscribed } from '@/utils/localStorageOperations';

interface EmailCaptureProps {
  title?: string;
  description?: string;
  buttonText?: string;
  listId?: string; // Mailchimp list/audience ID
  showAdminControls?: boolean; // Prop to toggle admin controls visibility
}

const EmailCapture = ({
  title = "Stay Updated",
  description = "Join our mailing list for tips, updates and early access to new features.",
  buttonText = "Subscribe",
  listId = "c9ba2a17ee", // Default list ID from eMail.html
  showAdminControls = false // Hidden by default
}: EmailCaptureProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [lastSubmittedEmail, setLastSubmittedEmail] = useState<string | null>(null);
  const [emailCount, setEmailCount] = useState(0);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const { toast } = useToast();

  // Check localStorage on component mount to see if user is already subscribed
  useEffect(() => {
    // If there are any emails in localStorage, consider the user as subscribed
    const emails = getEmailsFromLocalStorage();
    if (emails.length > 0) {
      setAlreadySubscribed(true);
    }
    
    if (showAdminControls) {
      setEmailCount(emails.length);
    }
  }, [showAdminControls]);

  // Admin function to download emails via keyboard shortcut
  const handleDownloadEmails = useCallback(() => {
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
    
    toast({
      title: "Admin Action",
      description: "Email list download initiated",
      variant: "default"
    });
  }, [toast]);

  // Add keyboard shortcut for admin functionality
  useKeyboardShortcut({
    ctrlKey: true,
    shiftKey: true,
    key: 'E',
    callback: handleDownloadEmails
  });

  const handleResetForm = useCallback(() => {
    setAlreadySubscribed(false);
  }, []);

  const handleSubmit = async (email: string) => {
    // Check if the email is already subscribed
    if (isEmailAlreadySubscribed(email)) {
      setAlreadySubscribed(true);
      toast({
        title: "Already Subscribed",
        description: "This email is already subscribed to our newsletter.",
        variant: "default"
      });
      return;
    }
    
    // Clear any previous errors
    setSubmitError(null);
    setIsSubmitting(true);
    setLastSubmittedEmail(email);
    
    // Start progress animation
    setProgress(15);
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 15;
        const newValue = prev + increment;
        return newValue >= 90 ? 90 : newValue;
      });
    }, 400);
    
    try {
      // Make sure progress shows a bit
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(40);
      
      console.log(`Attempting to subscribe email: ${email} to list: ${listId}`);
      
      const result = await subscribeToMailchimp({
        email,
        listId
      });
      
      // Complete progress
      setProgress(100);
      
      console.log('Subscription result:', result);
      
      // Only show success toast, without showing email details
      if (result.success) {
        // Mark as subscribed in the UI
        setAlreadySubscribed(true);
        
        toast({
          title: "Success!",
          description: "Thank you for subscribing.",
          variant: "default"
        });
        
        // After successful submission, redirect to signup page
        setTimeout(() => {
          navigate('/signup');
        }, 500);
      }

      // Update email count after successful submission
      if (showAdminControls) {
        setEmailCount(getEmailsFromLocalStorage().length);
      }
      
    } catch (error) {
      // Set progress to error state
      setProgress(100);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred. Please try again later.';
      
      console.error('Error in email submission:', errorMessage);
      
      toast({
        title: "Error",
        description: "There was a problem with your subscription. Please try again.",
        variant: "destructive"
      });
      
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsSubmitting(false);
        setProgress(0);
      }, 500); // Reset progress after a delay
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-accent/20 p-6 rounded-lg relative">
      <SubmissionProgress isSubmitting={isSubmitting} progress={progress} />
      
      <EmailCaptureTitleSection 
        isSubmitting={isSubmitting} 
        title={title} 
        description={description} 
      />
      
      {alreadySubscribed ? (
        <AlreadySubscribedView />
      ) : (
        <EmailCaptureForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          buttonText={buttonText}
          error={submitError}
        />
      )}
      
      {/* Admin controls - only shown if showAdminControls is true */}
      {showAdminControls && (
        <EmailCaptureAdminControls 
          emailCount={emailCount}
          onResetForm={handleResetForm}
        />
      )}
    </div>
  );
};

export default EmailCapture;
