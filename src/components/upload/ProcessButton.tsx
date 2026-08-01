
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

interface ProcessButtonProps {
  onProcess: () => void;
  isProcessing: boolean;
  disabled: boolean;
}

const ProcessButton = ({ onProcess, isProcessing, disabled }: ProcessButtonProps) => {
  return (
    <Button 
      onClick={onProcess}
      disabled={disabled || isProcessing}
      className="w-full mt-4 flex items-center justify-center gap-2"
    >
      {isProcessing ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Processing Images...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Organize Photos
        </>
      )}
    </Button>
  );
};

export default ProcessButton;
