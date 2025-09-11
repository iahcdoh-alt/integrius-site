// src/app/qa/page.tsx
import WidgetFloating from "@/components/qa/WidgetFloating";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Teste do Widget Flutuante</h1>
        <p className="text-gray-600">
          Clique no botão 💬 no canto inferior direito para abrir o Q&A.
        </p>
      </div>
      <WidgetFloating position="br" size={320} compactHeader />
    </main>
  );
}
