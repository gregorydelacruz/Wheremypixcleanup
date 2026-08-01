
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface SubmissionProgressProps {
  isSubmitting: boolean;
  progress: number;
}

const SubmissionProgress = ({ isSubmitting, progress }: SubmissionProgressProps) => {
  if (!isSubmitting || progress <= 0) return null;
  
  // Determine color based on progress (red for error state when at 100%)
  const indicatorClassName = progress === 100 && progress > 95 ? "bg-red-500" : "";
  
  return (
    <div className="absolute top-0 left-0 w-full">
      <Progress 
        value={progress} 
        className="h-1 rounded-none rounded-t-lg" 
        indicatorClassName={indicatorClassName}
      />
    </div>
  );
};

export default SubmissionProgress;
