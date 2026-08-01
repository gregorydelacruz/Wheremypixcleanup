import { useEffect, useState } from 'react';
import { AlertTriangle, Copy, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DiagnosticReport,
  clearDiagnostic,
  getDiagnostic,
  subscribeDiagnostics,
} from '@/lib/diagnostics';

const KIND_LABEL: Record<DiagnosticReport['kind'], string> = {
  auth0_callback: 'Auth0 callback',
  auth0_token: 'Auth0 token',
  cors: 'CORS / network',
  edge_401: 'analyze-image 401',
  edge_error: 'analyze-image error',
  unknown: 'Unknown',
};

function Row({ label, value }: { label: string; value?: string | number }) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-3 py-1.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="break-words font-mono text-xs leading-relaxed">{value}</span>
    </div>
  );
}

export default function DiagnosticsScreen() {
  const [report, setReport] = useState<DiagnosticReport | null>(getDiagnostic());

  useEffect(() => subscribeDiagnostics(setReport), []);

  if (!report) return null;

  const copyText = JSON.stringify(report, null, 2);

  return (
    <div
      role="alertdialog"
      aria-label="Failure diagnostics"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-lg">
        <button
          onClick={clearDiagnostic}
          aria-label="Dismiss diagnostics"
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {KIND_LABEL[report.kind]}
            </p>
            <h2 className="text-lg font-semibold text-card-foreground">{report.title}</h2>
          </div>
        </div>

        <div className="mt-4 divide-y divide-border rounded-lg border border-border px-3 py-1">
          <Row label="Status" value={report.status} />
          <Row label="Code" value={report.code} />
          <Row label="Message" value={report.message} />
          <Row label="Origin" value={report.origin} />
          <Row label="Time" value={report.at} />
        </div>

        {report.hint && (
          <p className="mt-4 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
            {report.hint}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(copyText)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy details
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            Reload
          </Button>
          <Button size="sm" onClick={clearDiagnostic}>
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  );
}
