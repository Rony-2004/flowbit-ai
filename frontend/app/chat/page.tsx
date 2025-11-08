"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function ChatRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // small delay to show the redirecting message
    const id = setTimeout(() => router.replace('/dashboard'), 400);
    return () => clearTimeout(id);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-6 bg-card rounded-lg shadow">
        <div className="flex items-center justify-center mb-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
        <h2 className="text-lg font-semibold">Redirecting...</h2>
        <p className="text-sm text-muted-foreground">You will be redirected to the Dashboard shortly.</p>
      </div>
    </div>
  );
}
