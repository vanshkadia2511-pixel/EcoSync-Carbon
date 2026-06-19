export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">About EcoTrack</h1>
        <p className="mt-3 text-lg text-gray-500 max-w-xl mx-auto">
          Learn about our methodology, emission factors, and calculations.
        </p>
      </div>

      {/* Methodology Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Our Calculations & Methodology</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          EcoTrack utilizes standard factors from international environmental organizations to calculate monthly and yearly carbon emissions. 
          The basic formula adds estimated contributions from your transport, diet, home energy, and shopping footprints.
        </p>
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-150 font-mono text-xs text-gray-700 overflow-x-auto">
          Monthly Emissions = (Transport km/week × 4 × Factor) + (Diet Monthly Baseline) + (Electricity kWh × Factor) + (Shopping Monthly Baseline) + (Flights km/month × Factor)
        </div>
      </div>

      {/* Emission Factors Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Emission Factors</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 rounded-lg">
              <tr>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Usage Unit</th>
                <th className="px-4 py-3 text-right">CO₂e Factor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150">
              <tr>
                <td className="px-4 py-3 font-semibold text-gray-800">Car</td>
                <td className="px-4 py-3">km/week</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">0.21 kg/km</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-gray-800">Bus</td>
                <td className="px-4 py-3">km/week</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">0.089 kg/km</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-gray-800">Train/Metro</td>
                <td className="px-4 py-3">km/week</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">0.041 kg/km</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-gray-800">Bike/Walk</td>
                <td className="px-4 py-3">km/week</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">0 kg/km</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-gray-800">Flight</td>
                <td className="px-4 py-3">km/month</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">0.255 kg/km</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-gray-800">Vegan Diet</td>
                <td className="px-4 py-3">Baseline monthly</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">55 kg</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-gray-800">Vegetarian Diet</td>
                <td className="px-4 py-3">Baseline monthly</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">85 kg</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-gray-800">Omnivore Diet</td>
                <td className="px-4 py-3">Baseline monthly</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">150 kg</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-gray-800">Meat-heavy Diet</td>
                <td className="px-4 py-3">Baseline monthly</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">230 kg</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-gray-800">Electricity</td>
                <td className="px-4 py-3">kWh/month</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">0.82 kg/kWh</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-gray-800">Shopping Low</td>
                <td className="px-4 py-3">Baseline monthly</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">30 kg</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-gray-800">Shopping Medium</td>
                <td className="px-4 py-3">Baseline monthly</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">70 kg</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-gray-800">Shopping High</td>
                <td className="px-4 py-3">Baseline monthly</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">130 kg</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Eco Score Ranges */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Eco Score Scale</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 rounded-lg">
              <tr>
                <th className="px-4 py-3">Monthly Footprint</th>
                <th className="px-4 py-3">Score Range</th>
                <th className="px-4 py-3">Eco Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150">
              <tr className="text-green-800 bg-green-50/20">
                <td className="px-4 py-3 font-semibold">0–250 kg</td>
                <td className="px-4 py-3 font-bold">90–100</td>
                <td className="px-4 py-3 font-medium">Excellent low-impact lifestyle</td>
              </tr>
              <tr className="text-emerald-800 bg-emerald-50/20">
                <td className="px-4 py-3 font-semibold">251–500 kg</td>
                <td className="px-4 py-3 font-bold">70–89</td>
                <td className="px-4 py-3 font-medium">Good start with clear improvement options</td>
              </tr>
              <tr className="text-yellow-800 bg-yellow-50/20">
                <td className="px-4 py-3 font-semibold">501–800 kg</td>
                <td className="px-4 py-3 font-bold">50–69</td>
                <td className="px-4 py-3 font-medium">Moderate footprint with useful action areas</td>
              </tr>
              <tr className="text-orange-800 bg-orange-50/20">
                <td className="px-4 py-3 font-semibold">801–1200 kg</td>
                <td className="px-4 py-3 font-bold">30–49</td>
                <td className="px-4 py-3 font-medium">High footprint with major opportunities</td>
              </tr>
              <tr className="text-red-800 bg-red-50/20">
                <td className="px-4 py-3 font-semibold">1200+ kg</td>
                <td className="px-4 py-3 font-bold">0–29</td>
                <td className="px-4 py-3 font-medium">Very high footprint; focus on one category first</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Disclaimers & Privacy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-2">Data Privacy Principles</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Your audit inputs and calculated records are saved locally in your web browser. 
            No identifying information is shared or synced unless explicit integration points are configured.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-2">Sources & Limitations</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Footprint calculations represent approximations based on average lifestyle factors. Actual footprints can vary due to regional power grid mixes, driving conditions, and manufacturing differences.
          </p>
        </div>
      </div>
    </div>
  );
}
