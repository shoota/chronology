import { Calendar } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
            <Calendar className="h-6 w-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">CHRONOS</h1>
            <p className="text-xs text-slate-500">年表作成ツール</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
          <span className="font-medium">v1.0.0</span>
        </div>
      </div>
    </header>
  );
};
