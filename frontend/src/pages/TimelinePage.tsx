interface Milestone {
  year: string;
  title: string;
  description: string;
}

const MILESTONES: Milestone[] = [
  { year: "1896", title: "Arrhenius Predicts Greenhouse Warming", description: "Swedish scientist Svante Arrhenius publishes first calculations of global warming from human-induced carbon dioxide emissions." },
  { year: "1958", title: "Keeling Curve Begins", description: "Charles David Keeling begins continuous measurements of atmospheric CO₂ at Mauna Loa Observatory, proving atmospheric carbon concentrations are rising steadily." },
  { year: "1972", title: "Stockholm Earth Summit", description: "The UN Conference on the Human Environment is held in Sweden. It represents the first global summit recognizing humanity's footprint on biosphere systems." },
  { year: "1988", title: "IPCC Established", description: "The UN Environment Programme (UNEP) and World Meteorological Organization (WMO) create the Intergovernmental Panel on Climate Change (IPCC) to compile scientific assessments." },
  { year: "1992", title: "Rio Earth Summit & UNFCCC", description: "The Rio Earth Summit establishes the UN Framework Convention on Climate Change (UNFCCC) with the goal of stabilizing atmospheric greenhouse gas concentrations." },
  { year: "1997", title: "Kyoto Protocol Adopted", description: "The first international treaty with legally binding emission reduction targets for developed countries is signed in Kyoto, Japan." },
  { year: "2006", title: "IPCC AR4 Report Highlights Warming", description: "The Fourth Assessment Report concludes that warming of the climate system is unequivocal, driven primarily by human greenhouse gas releases." },
  { year: "2015", title: "Paris Agreement Signed", description: "196 nations sign the landmark Paris Agreement, pledging to limit global temperature rises to well below 2°C, and target a 1.5°C ceiling limit." },
  { year: "2019", title: "Global Climate Strikes", description: "Millions of students and citizens worldwide take to the streets, sparked by Fridays for Future movement, demanding rapid political climate action." },
  { year: "2021", title: "Glasgow COP26 Summit", description: "COP26 completes Paris Agreement rulebooks, with countries agreeing to phase down coal power and update emission targets more frequently." },
  { year: "2022", title: "Inflation Reduction Act (IRA)", description: "The US passes the Inflation Reduction Act, authorizing hundreds of billions in clean energy tax credits, sparking a global investment boom." },
  { year: "2030", title: "Net Zero Milestone Target", description: "The global milestone target to reduce carbon emissions by 45% compared to 2010 levels, tracking toward a Net Zero future by 2050." }
];

export default function TimelinePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Climate Action Timeline</h1>
        <p className="mt-3 text-lg text-gray-500 max-w-xl mx-auto">
          Explore key scientific predictions, global summits, and policy actions that shape our response to climate change.
        </p>
      </div>

      <div className="relative border-l-2 border-green-200 ml-4 md:ml-32">
        {MILESTONES.map((item, index) => (
          <div key={index} className="mb-10 ml-6 relative">
            {/* Timeline Circle */}
            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 ring-4 ring-white"></span>

            {/* Year Badge (floating left on desktop) */}
            <div className="md:absolute md:-left-36 md:top-0 text-left font-extrabold text-green-700 text-lg md:w-28 mb-2 md:mb-0">
              {item.year}
            </div>

            {/* Content card */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-green-200 transition-colors duration-150">
              <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
