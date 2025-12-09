// demerzels-lab/kalshchain/KalshChain-237051255d46360ee0eab8d0278534895dc525cf/src/app/docs/layout.tsx
import { DocsSidebar } from '@/components/docs/DocsSidebar';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Inverted layout background
    <div className="bg-white">
      <div className="max-w-7xl mx-auto flex">
        <DocsSidebar />
        
        {/* Inverted content area background for a clean look */}
        <div className="flex-1 min-h-[calc(100vh-64px)] p-6 lg:p-10 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}