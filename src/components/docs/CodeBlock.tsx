// demerzels-lab/kalshchain/KalshChain-237051255d46360ee0eab8d0278534895dc525cf/src/components/docs/CodeBlock.tsx
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // Inverted code block styling: Light background, light border, dark text
    <div className="rounded-lg border border-slate-200 shadow-md my-6 overflow-hidden">
      {/* Header: Light background, darker text */}
      <div className="flex justify-between items-center px-4 py-2 bg-slate-100 border-b border-slate-200">
        <span className="text-xs text-slate-600 font-mono">
          {filename || `${language} code`}
        </span>
        {/* Cyan-primary hover accent for copy button */}
        <button
          onClick={handleCopy}
          className="text-slate-500 hover:text-cyan-primary-600 transition-colors flex items-center gap-1 text-xs"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      {/* Code area: White background, dark text */}
      <pre className="p-4 bg-white overflow-x-auto">
        <code className="text-sm text-slate-900 whitespace-pre-wrap font-mono">
          {code}
        </code>
      </pre>
    </div>
  );
}