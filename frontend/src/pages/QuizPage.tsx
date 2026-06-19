import { useState } from 'react';
import { useEcoStore } from '../store/useEcoStore';

interface Question {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    question: "What is a carbon footprint?",
    options: [
      "The total greenhouse gas emissions caused directly and indirectly by an individual, organization, event, or product",
      "The physical print left by fossil fuel factories on natural soils",
      "The amount of carbon dioxide absorbed by a tree over its lifetime",
      "The weight of coal consumed daily by local power grids"
    ],
    answerIndex: 0,
    explanation: "A carbon footprint is a measure of the total greenhouse gases (including carbon dioxide and methane) emitted by our actions."
  },
  {
    question: "Which diet has the lowest carbon impact?",
    options: [
      "Vegan diet",
      "Vegetarian diet",
      "Omnivore diet",
      "Meat-heavy diet"
    ],
    answerIndex: 0,
    explanation: "A vegan diet has the lowest carbon footprint (~55 kg CO₂e/month) since plant-based food requires significantly less land, water, and energy compared to raising livestock."
  },
  {
    question: "What percentage of global greenhouse gas emissions come from direct transport?",
    options: [
      "~16%",
      "~5%",
      "~45%",
      "~70%"
    ],
    answerIndex: 0,
    explanation: "Direct transport (road, aviation, shipping, rail) makes up about 16% of global greenhouse emissions. Road transit is the largest contributor within this category."
  },
  {
    question: "How much CO₂ does 1 kWh of typical grid electricity produce on average?",
    options: [
      "~0.4–0.8 kg",
      "~5 kg",
      "0 kg",
      "~0.01 kg"
    ],
    answerIndex: 0,
    explanation: "Depending on the fuel mix, average grid electricity emits roughly 0.4 to 0.8 kg of CO₂ per kilowatt-hour. (EcoTrack spec uses 0.82 kg/kWh)."
  },
  {
    question: "Which is more carbon-intensive — beef or chicken?",
    options: [
      "Beef (up to 20x more carbon-intensive)",
      "Chicken (up to 5x more carbon-intensive)",
      "They are roughly the same",
      "Chicken, due to packaging transport"
    ],
    answerIndex: 0,
    explanation: "Beef production is extremely carbon intensive, releasing up to 20 times more greenhouse gases per gram of protein than chicken, primarily due to cattle methane emissions and feed land use."
  },
  {
    question: "What is the primary target of the Paris Climate Agreement?",
    options: [
      "Limit global warming to well below 2°C, preferably to 1.5°C, compared to pre-industrial levels",
      "A complete ban on plastic bottles by the year 2030",
      "Transition all commercial aviation to hydrogen fuel by 2040",
      "Plant one trillion trees by the end of this decade"
    ],
    answerIndex: 0,
    explanation: "The Paris Agreement is a legally binding international treaty on climate change aiming to limit global warming to well below 2 degrees Celsius, preferably to 1.5 degrees."
  },
  {
    question: "What does the term 'Net Zero' mean?",
    options: [
      "Emissions produced are balanced by the equivalent amount active greenhouse gases removed from the atmosphere",
      "Producing absolutely zero carbon emissions whatsoever across the entire globe",
      "Ensuring all corporate companies pay zero tax on clean energy products",
      "Reducing the global average temperature back to exactly zero degrees Celsius"
    ],
    answerIndex: 0,
    explanation: "Net zero means cutting greenhouse gas emissions to as close to zero as possible, with any remaining emissions re-absorbed from the atmosphere (e.g., by oceans and forests)."
  },
  {
    question: "Which action saves the most CO₂ footprint at home?",
    options: [
      "Switching to a 100% renewable energy provider",
      "Unplugging phone chargers when not in use",
      "Switching off standby lights on TVs",
      "Recycling cardboard cereal boxes"
    ],
    answerIndex: 0,
    explanation: "Switching to renewable energy eliminates the high emissions associated with fossil fuel-generated electricity. While small habits help, energy source transition yields the highest savings."
  }
];

export default function QuizPage() {
  const { addSeeds, unlockBadge } = useEcoStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (submitted) return;
    setSelectedOpt(idx);
  };

  const handleSubmit = () => {
    if (selectedOpt === null || submitted) return;
    setSubmitted(true);

    const q = QUESTIONS[currentIdx];
    if (selectedOpt === q.answerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setSubmitted(false);

    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
      // Award reward seeds if >= 6 correct
      if (score >= 6) {
        addSeeds(100);
        unlockBadge('climate_learner');
      }
    }
  };

  if (quizFinished) {
    const passed = score >= 6;
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <div className="text-6xl mb-6">
            {passed ? '🎓' : '⏳'}
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Quiz Completed!</h2>
          <p className="text-gray-500 mb-6">You scored {score} out of {QUESTIONS.length} correct.</p>

          {passed ? (
            <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-100 mb-8">
              <h4 className="font-bold text-sm">Congratulations! You Passed!</h4>
              <p className="text-xs text-green-600 mt-1">
                You have earned **100 Seeds** and unlocked the **Climate Learner** badge! Keep spreading the green knowledge.
              </p>
            </div>
          ) : (
            <div className="bg-amber-50 text-amber-800 p-6 rounded-xl border border-amber-100 mb-8">
              <h4 className="font-bold text-sm">Nice effort!</h4>
              <p className="text-xs text-amber-600 mt-1">
                You need 6 or more correct to unlock the badge and seeds. Retake the quiz to try again!
              </p>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setCurrentIdx(0);
                setSelectedOpt(null);
                setSubmitted(false);
                setScore(0);
                setQuizFinished(false);
              }}
              className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm transition duration-150"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[currentIdx];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 animate-fade-in">
      <div className="mb-6 flex justify-between items-center text-xs text-gray-400 font-semibold uppercase tracking-wider">
        <span>Climate Knowledge Quiz</span>
        <span>Question {currentIdx + 1} of {QUESTIONS.length}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1.5 rounded-full mb-8">
        <div
          className="bg-green-600 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((currentIdx) / QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{q.question}</h2>

        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let btnClass = 'border-gray-200 hover:border-green-500 hover:bg-green-50/20';
            
            if (submitted) {
              if (idx === q.answerIndex) {
                btnClass = 'bg-green-50 border-green-500 text-green-800 font-medium';
              } else if (idx === selectedOpt) {
                btnClass = 'bg-red-50 border-red-300 text-red-800';
              } else {
                btnClass = 'border-gray-100 opacity-60';
              }
            } else if (idx === selectedOpt) {
              btnClass = 'border-green-600 bg-green-50/40 font-medium';
            }

            return (
              <button
                key={idx}
                disabled={submitted}
                aria-pressed={selectedOpt === idx}
                aria-label={`${opt}${submitted && idx === q.answerIndex ? ' (Correct Answer)' : ''}${submitted && idx === selectedOpt && idx !== q.answerIndex ? ' (Incorrect Selection)' : ''}`}
                onClick={() => handleOptionSelect(idx)}
                className={`w-full text-left p-4 rounded-xl border text-sm transition duration-150 ${btnClass}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {submitted && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded-xl">
            <span className="text-xs font-bold text-gray-700 block mb-1">Explanation:</span>
            <p className="text-xs text-gray-600 leading-relaxed">{q.explanation}</p>
          </div>
        )}

        <div className="mt-8 flex justify-end gap-3">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOpt === null}
              className="px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium rounded-lg text-sm transition duration-150"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm transition duration-150"
            >
              {currentIdx + 1 === QUESTIONS.length ? 'Finish' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
