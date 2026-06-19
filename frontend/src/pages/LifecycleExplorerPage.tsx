import { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

interface StageEmission {
  stage: string;
  co2: number;
}

interface ProductLifecycle {
  id: string;
  name: string;
  icon: string;
  total: number;
  stages: StageEmission[];
  insight: string;
}

const PRODUCTS: ProductLifecycle[] = [
  {
    id: 'tshirt',
    name: 'Cotton T-Shirt',
    icon: '👕',
    total: 15,
    stages: [
      { stage: 'Raw Mat.', co2: 5.5 },
      { stage: 'Mfg', co2: 4.0 },
      { stage: 'Transport', co2: 1.5 },
      { stage: 'Usage', co2: 3.5 },
      { stage: 'Disposal', co2: 0.5 }
    ],
    insight: "Usage emissions are high for clothing because of washing machines and dryers. Washing in cold water and air-drying significantly cuts footprint."
  },
  {
    id: 'smartphone',
    name: 'Smartphone',
    icon: '📱',
    total: 77,
    stages: [
      { stage: 'Raw Mat.', co2: 30 },
      { stage: 'Mfg', co2: 25 },
      { stage: 'Transport', co2: 5 },
      { stage: 'Usage', co2: 15 },
      { stage: 'Disposal', co2: 2 }
    ],
    insight: "Over 70% of smartphone emissions occur during extraction and manufacturing. Keeping your phone for 4 years instead of 2 cuts its annual footprint in half."
  },
  {
    id: 'burger',
    name: 'Beef Burger',
    icon: '🍔',
    total: 5.5,
    stages: [
      { stage: 'Raw Mat.', co2: 4.0 },
      { stage: 'Mfg', co2: 0.5 },
      { stage: 'Transport', co2: 0.8 },
      { stage: 'Usage', co2: 0 },
      { stage: 'Disposal', co2: 0.2 }
    ],
    insight: "Livestock methane emissions represent the vast majority of raw material footprint. Swapping beef for a plant-based burger saves up to 90% emissions."
  },
  {
    id: 'bottle',
    name: 'Plastic Water Bottle',
    icon: '🥤',
    total: 0.9,
    stages: [
      { stage: 'Raw Mat.', co2: 0.5 },
      { stage: 'Mfg', co2: 0.2 },
      { stage: 'Transport', co2: 0.1 },
      { stage: 'Usage', co2: 0 },
      { stage: 'Disposal', co2: 0.1 }
    ],
    insight: "While the raw total seems small, billions of plastic bottles are consumed yearly. Reusable water containers eliminate the continuous packaging lifecycle."
  },
  {
    id: 'jeans',
    name: 'Blue Jeans',
    icon: '👖',
    total: 20.5,
    stages: [
      { stage: 'Raw Mat.', co2: 8.0 },
      { stage: 'Mfg', co2: 6.0 },
      { stage: 'Transport', co2: 2.0 },
      { stage: 'Usage', co2: 4.0 },
      { stage: 'Disposal', co2: 0.5 }
    ],
    insight: "Cotton farming and denim fabric finishing represent high raw material & manufacturing footprint. Buying second-hand jeans bypasses these heavy stages completely."
  },
  {
    id: 'laptop',
    name: 'Laptop Computer',
    icon: '💻',
    total: 270,
    stages: [
      { stage: 'Raw Mat.', co2: 80 },
      { stage: 'Mfg', co2: 100 },
      { stage: 'Transport', co2: 15 },
      { stage: 'Usage', co2: 70 },
      { stage: 'Disposal', co2: 5 }
    ],
    insight: "Laptops require intensive energy during fabrication and daily usage. Activating power savings features, shut down when idle, and repairing can lower lifetime footprint."
  }
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function LifecycleExplorerPage() {
  const [selectedId, setSelectedId] = useState(PRODUCTS[0].id);

  const selectedProduct = PRODUCTS.find(p => p.id === selectedId) || PRODUCTS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Product Lifecycle Explorer</h1>
        <p className="text-gray-500 mt-1">Explore and analyze the CO₂ footprint breakdown of everyday items across their lifecycle.</p>
      </div>

      {/* Grid selector buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {PRODUCTS.map((prod) => (
          <button
            key={prod.id}
            onClick={() => setSelectedId(prod.id)}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition duration-150 ${
              selectedId === prod.id
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-500 text-green-700 shadow-sm'
                : 'bg-white border-gray-150 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="text-3xl mb-2">{prod.icon}</span>
            <span className="text-xs font-bold">{prod.name}</span>
          </button>
        ))}
      </div>

      {/* Main product breakdown display */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info & Insights */}
        <div className="lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedProduct.icon}</span>
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">{selectedProduct.name}</h2>
                <p className="text-xs text-gray-400 mt-0.5">Product carbon footprint breakdown</p>
              </div>
            </div>

            <div className="mt-6">
              <span className="text-sm font-medium text-gray-500">Total Lifecycle Emissions</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-black text-gray-900">{selectedProduct.total}</span>
                <span className="text-sm font-bold text-gray-500">kg CO₂e</span>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 p-4 border border-gray-100 rounded-xl">
              <span className="text-xs font-bold text-gray-700 block mb-1">Key Insight:</span>
              <p className="text-xs text-gray-600 leading-relaxed">{selectedProduct.insight}</p>
            </div>
          </div>

          <div className="mt-8 text-xs text-gray-400">
            Source: Lifecycle assessment models and global carbon inventories.
          </div>
        </div>

        {/* Charts display */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-6">Emissions per Stage (kg CO₂e)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={selectedProduct.stages}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="stage" stroke="#9ca3af" fontSize={11} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} />
                <Tooltip formatter={(value) => `${value} kg CO₂e`} />
                <Bar dataKey="co2" radius={[4, 4, 0, 0]}>
                  {selectedProduct.stages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Table Breakdown */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-2">
            {selectedProduct.stages.map((stg, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center">
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{stg.stage}</span>
                <span className="text-sm font-bold text-gray-800 mt-1">{stg.co2} kg</span>
                <span className="text-[9px] text-gray-400 mt-0.5">{Math.round((stg.co2 / selectedProduct.total) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
