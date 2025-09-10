// /app/qa/page.tsx
import QABot from "@/components/QABot";

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Q&A – Integrius</h1>
      <QABot />
    </main>
  );
}
