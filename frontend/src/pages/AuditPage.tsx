import CarbonAuditForm from '../components/audit/CarbonAuditForm';

export default function AuditPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
          🌍 Carbon Footprint Audit
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Answer 4 quick questions to calculate your monthly carbon footprint. Takes under 2 minutes.
          The live preview on the right updates as you type.
        </p>
      </div>
      <CarbonAuditForm />
    </div>
  );
}
