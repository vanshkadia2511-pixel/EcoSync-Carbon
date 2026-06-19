import { Link } from 'react-router-dom';
import { useEcoStore } from '../store/useEcoStore';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from 'recharts';

export default function DashboardPage() {
  const { latestFootprint, history, isDemoMode, resetDemoMode } = useEcoStore();

  if (!latestFootprint) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            📊
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">No Audit Data Found</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg leading-relaxed">
            Please complete your first carbon footprint audit to view your personalized carbon dashboard.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/audit" className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-xl shadow-md transition duration-200">
              Start Carbon Audit
            </Link>
            <button
              onClick={() => useEcoStore.getState().activateDemoMode()}
              className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition duration-200"
            >
              Load Demo Data
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { score, monthlyKgCO2e, yearlyKgCO2e, highestCategory, breakdown, topActions } = latestFootprint;

  // Chart data
  const pieData = [
    { name: 'Transport', value: breakdown.transport, color: '#3b82f6' },
    { name: 'Diet', value: breakdown.diet, color: '#f59e0b' },
    { name: 'Electricity', value: breakdown.electricity, color: '#ef4444' },
    { name: 'Shopping', value: breakdown.shopping, color: '#8b5cf6' },
    { name: 'Flights', value: breakdown.flights, color: '#06b6d4' },
  ].filter(item => item.value > 0);

  // Line chart history data
  const historyData = [...history]
    .reverse()
    .map(record => ({
      date: new Date(record.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      co2: record.monthlyKgCO2e,
      score: record.score
    }));

  // Bar chart action impact data
  const barData = [
    { name: 'Diet Shift', co2: 35, color: '#f59e0b' },
    { name: 'Public Transit', co2: 25, color: '#3b82f6' },
    { name: 'Renewable Power', co2: 60, color: '#ef4444' },
    { name: 'Reduced Waste', co2: 15, color: '#8b5cf6' },
  ];

  // Helper for category color
  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'transport': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'diet': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'electricity': return 'text-red-600 bg-red-50 border-red-100';
      case 'shopping': return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'flights': return 'text-cyan-600 bg-cyan-50 border-cyan-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  // Eco Score Level
  let scoreLevel = '';
  let scoreColor = '';
  let scoreDesc = '';
  if (score >= 90) {
    scoreLevel = 'Excellent';
    scoreColor = 'text-green-600';
    scoreDesc = 'Excellent low-impact lifestyle';
  } else if (score >= 70) {
    scoreLevel = 'Good';
    scoreColor = 'text-emerald-600';
    scoreDesc = 'Good start with clear improvement options';
  } else if (score >= 50) {
    scoreLevel = 'Moderate';
    scoreColor = 'text-yellow-600';
    scoreDesc = 'Moderate footprint with useful action areas';
  } else if (score >= 30) {
    scoreLevel = 'High';
    scoreColor = 'text-orange-600';
    scoreDesc = 'High footprint with major opportunities';
  } else {
    scoreLevel = 'Very High';
    scoreColor = 'text-red-600';
    scoreDesc = 'Very high footprint; focus on one category first';
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Carbon Dashboard</h1>
          <p className="text-gray-500 mt-1">Real-time analysis and reduction strategies for your carbon footprint.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/audit" className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm transition duration-150 shadow-sm">
            Retake Audit
          </Link>
          {isDemoMode && (
            <button
              onClick={resetDemoMode}
              className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium rounded-lg text-sm transition duration-150"
            >
              Exit Demo Mode
            </button>
          )}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Eco Score Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500">Eco Score</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className={`text-4xl font-extrabold ${scoreColor}`}>{score}</span>
              <span className="text-sm font-semibold text-gray-400">/ 100</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-50">
            <span className="text-xs font-semibold px-2.5 py-1 bg-green-50 text-green-700 rounded-full">{scoreLevel}</span>
            <p className="text-xs text-gray-500 mt-2">{scoreDesc}</p>
          </div>
        </div>

        {/* Monthly Footprint */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500">Monthly Footprint</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-extrabold text-gray-900">{monthlyKgCO2e.toLocaleString()}</span>
              <span className="text-sm font-semibold text-gray-500">kg CO₂e</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-50">
            <p className="text-xs text-gray-500">Estimated current monthly footprint</p>
          </div>
        </div>

        {/* Yearly Footprint */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500">Yearly Footprint</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-extrabold text-gray-900">{(yearlyKgCO2e / 1000).toFixed(1)}</span>
              <span className="text-sm font-semibold text-gray-500">t CO₂e/yr</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-50">
            <p className="text-xs text-gray-500">Based on monthly rate extrapolated</p>
          </div>
        </div>

        {/* Highest Category */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500">Highest Category</span>
            <div className="mt-3">
              <span className={`capitalize inline-block px-3 py-1.5 rounded-lg border text-sm font-medium ${getCategoryColor(highestCategory)}`}>
                {highestCategory}
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-50">
            <p className="text-xs text-gray-500">
              Contribution: <span className="font-semibold text-gray-800">{Math.round((breakdown[highestCategory as keyof typeof breakdown] / monthlyKgCO2e) * 100)}%</span> of total
            </p>
          </div>
        </div>

        {/* Action / Opportunity */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500">Biggest Opportunity</span>
            <p className="text-sm font-semibold text-gray-800 mt-2 line-clamp-2">
              {topActions[0] || 'Take a new audit to unlock recommendations.'}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-50">
            <Link to="/coach" className="text-xs font-medium text-green-600 hover:text-green-700 flex items-center gap-1">
              Ask AI Coach for help →
            </Link>
          </div>
        </div>

        {/* Best Habit */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500">Best Habit</span>
            <p className="text-sm font-semibold text-gray-800 mt-2 line-clamp-2">
              {breakdown.flights === 0 ? "Zero monthly flights! Excellent low-emission travel." : breakdown.transport < 50 ? "Your transport impact is already low. Keep that habit going." : "Nice diet choices. Keep exploring low-impact meals."}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-50">
            <p className="text-xs text-gray-400">Habit category: {breakdown.flights === 0 ? "flights" : breakdown.transport < 50 ? "transport" : "diet"}</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Pie Chart: Breakdown */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-1">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Emissions Breakdown</h3>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} kg CO₂e`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-gray-900">{Math.round(monthlyKgCO2e)}</span>
              <span className="text-xs text-gray-500">kg/month</span>
            </div>
          </div>
          {/* Legend */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="text-xs font-medium text-gray-600 capitalize truncate">{item.name}</span>
                <span className="text-xs text-gray-400 ml-auto">{Math.round((item.value / monthlyKgCO2e) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Line Chart: Progress */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Emissions Trend</h3>
          <div className="h-64">
            {historyData.length > 1 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} label={{ value: 'kg CO₂e', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af', fontSize: 12 } }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="co2" name="Footprint" stroke="#16a34a" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center flex-col text-center">
                <p className="text-gray-400 text-sm mb-4">Complete multiple audits over time to view your carbon reduction trend line.</p>
                <Link to="/audit" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition duration-150">
                  Take Next Audit
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Suggested Actions & Reduction Opportunities */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">Custom Action Plan</h3>
          <Link to="/coach" className="text-sm font-semibold text-green-600 hover:text-green-700">
            Coach Chat →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topActions.map((action, index) => (
            <div key={index} className="p-5 rounded-xl border border-gray-100 bg-gray-50 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Action #{index + 1}</span>
                <p className="text-gray-800 font-semibold mt-3 text-sm leading-relaxed">{action}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-xs text-gray-500">Estimated Impact</span>
                <span className="text-xs font-bold text-emerald-600">-15% CO₂e</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
