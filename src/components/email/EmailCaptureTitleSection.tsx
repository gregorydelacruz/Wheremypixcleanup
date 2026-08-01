
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface EmailCaptureTitleSectionProps {
  isSubmitting: boolean;
  title: string;
  description: string;
}

const EmailCaptureTitleSection = ({ 
  isSubmitting, 
  title, 
  description 
}: EmailCaptureTitleSectionProps) => {
  if (isSubmitting) {
    return (
      <div className="text-center mb-4">
        <Skeleton className="h-6 w-32 mx-auto mb-2" />
        <Skeleton className="h-4 w-48 mx-auto" />
      </div>
    );
  }
  
  return (
    <div className="text-center mb-4">
      <h3 className="text-lg font-medium text-center">{title}</h3>
      <p className="text-muted-foreground text-sm mt-1 text-center">{description}</p>
    </div>
  );
};

export default EmailCaptureTitleSection;
