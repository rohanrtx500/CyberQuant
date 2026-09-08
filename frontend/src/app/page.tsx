"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-64 text-slate-500 text-xs">
      Redirecting to CyberQuant Executive Dashboard...
    </div>
  );
}
