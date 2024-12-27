import { Building2 } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-gray-700" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tone Studio</h1>
              <p className="text-sm text-gray-500">By Galaxy</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold text-gray-900">GALAXY ENCLAVE PVT. LTD.</h2>
            <p className="text-sm text-gray-600">ADD : SP-5, MANSAROVAR INDUSTRIAL AREA</p>
            <p className="text-sm text-gray-600">RIICO, JAIPUR-302020, RAJASTHAN</p>
          </div>
        </div>
      </div>
    </div>
  );
}