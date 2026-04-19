"use client";

import { useState, useEffect } from "react";
import type { Data } from "@credbuild/core";
import { CredBuild } from "@credbuild/core";
import config from "../../../credbuild.config";

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-10 text-center text-gray-500">Loading Editor...</div>;
  }

  return (
    <CredBuild
      config={config}
      data={data}
      headerPath={path}
      onPublish={async (data) => {
        const response = await fetch("/api/credbuild", {
          method: "post",
          body: JSON.stringify({ data, path }),
        });

        if (response.ok) {
          // Create success toast
          const toast = document.createElement('div');
          toast.innerHTML = '✅ Berhasil Dipublish! Halaman sudah diperbarui';
          toast.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 99999;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white; padding: 16px 24px; border-radius: 12px;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
            font-weight: 600; animation: slideIn 0.3s ease-out;
          `;

          // Add animations
          if (!document.querySelector('#toast-anim')) {
            const style = document.createElement('style');
            style.id = 'toast-anim';
            style.textContent = '@keyframes slideIn { from { transform: translateX(400px);} to { transform: translateX(0); } } @keyframes slideOut { from { transform: translateX(0); } to { transform: translateX(400px); } }';
            document.head.appendChild(style);
          }

          document.body.appendChild(toast);
          setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
          }, 3000);
        }
      }}
    />
  );
}
