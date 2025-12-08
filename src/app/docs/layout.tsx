import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { Toaster } from 'react-hot-toast';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <DocsSidebar />
      <main className="flex-1 max-w-5xl mx-auto px-8 py-8">
        {children}
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155',
          },
        }}
      />
    </div>
  );
}
