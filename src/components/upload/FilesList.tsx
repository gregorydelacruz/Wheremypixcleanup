
import { Skeleton } from "@/components/ui/skeleton";

interface FilesListProps {
  files: File[];
  isProcessing: boolean;
}

const FilesList = ({ files, isProcessing }: FilesListProps) => {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <p className="text-sm mb-2 font-medium">{files.length} {files.length === 1 ? 'file' : 'files'} selected</p>
      <div className="text-sm text-muted-foreground max-h-32 overflow-y-auto p-2 bg-muted/30 rounded-md">
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <ul>
            {files.map((file, i) => (
              <li key={i} className="truncate">{file.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilesList;
