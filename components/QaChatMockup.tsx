export default function QaChatMockup() {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-2xl shadow-md bg-white">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Pergunte sobre os produtos Integrius
      </h2>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-4">
        <div className="flex justify-end">
          <div className="max-w-xs bg-blue-600 text-white px-4 py-2 rounded-2xl shadow-sm">
            O que a Integrius faz?
          </div>
        </div>

        <div className="flex justify-start">
          <div className="max-w-xs bg-gray-100 px-4 py-2 rounded-2xl shadow-sm">
            A Integrius desenvolve soluções de automação e inteligência aplicada,
            como assistentes de agendamento odontológico (Dentech) e integrações
            personalizadas com n8n, WhatsApp e IA generativa.
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Fontes:</span>
              <ul className="list-disc list-inside">
                <li>[[1]] Integrius — O que fazemos</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="max-w-xs bg-gray-100 px-4 py-2 rounded-2xl shadow-sm">
            Não encontrei informações suficientes.  
            <a
              href="#"
              className="text-blue-600 underline ml-1"
            >
              Fale no WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Digite sua pergunta…"
          className="flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700">
          Enviar
        </button>
      </div>
    </div>
  );
}
