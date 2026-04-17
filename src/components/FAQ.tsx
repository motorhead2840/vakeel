import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: "What is an FIR and how do I file it?",
    answer: "A First Information Report (FIR) is a written document prepared by the police when they receive information about the commission of a cognizable offence. You can file it by visiting the nearest police station and giving a written or oral statement to the officer-in-charge. Some states also allow e-FIRs for certain non-heinous crimes like theft or lost items."
  },
  {
    question: "What is the difference between Cognizable and Non-Cognizable offences?",
    answer: "In a cognizable offence (e.g., murder, rape, robbery), the police can arrest the accused without a warrant and start an investigation without court permission. In a non-cognizable offence (e.g., assault, cheating, defamation), a police officer cannot arrest without a warrant and needs a magistrate's order to investigate."
  },
  {
    question: "Am I eligible for free Legal Aid?",
    answer: "Under the Legal Services Authorities Act, free legal aid is available to women, children, members of SC/ST, victims of human trafficking or begar, mentally ill/disabled persons, industrial workmen, victims of mass disasters/ethnic violence, and individuals with an annual income below the prescribed state limits."
  },
  {
    question: "What should I do if the police refuse to register my FIR?",
    answer: "If the officer in charge of the police station refuses to record your FIR, you can send the substance of the information in writing, by post, to the Superintendent of Police (SP). If satisfied that such information discloses a cognizable offence, the SP will investigate the case. Alternatively, you can file a private complaint before a magistrate under Section 156(3) of the CrPC."
  },
  {
    question: "What is Anticipatory Bail?",
    answer: "Anticipatory bail is a direction to release a person on bail, issued even before the person is arrested. If any person has reason to believe that they may be arrested on accusation of having committed a non-bailable offence, they may apply to the High Court or the Court of Session for such a direction."
  },
  {
    question: "How does the 'Vakeel Verification' badge work?",
    answer: "Advocates practicing in India can apply for verification by submitting their Bar Council ID, Aadhar Card, and Degree certificates in our Directory section. Once vetted, their profile receives a blue 'Verified' shield, letting citizens know they are authenticated legal professionals."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="bg-blue-100 text-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
        <p className="text-gray-600">Find answers to common legal queries and learn how to navigate the Vakeel platform.</p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <div 
            key={index} 
            className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
              openIndex === index ? 'bg-white border-blue-200 shadow-md ring-1 ring-blue-100' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
            }`}
          >
            <button 
              onClick={() => toggleFaq(index)}
              className="w-full p-5 sm:p-6 flex justify-between items-center text-left focus:outline-none"
            >
              <h3 className={`font-bold text-lg pr-4 ${openIndex === index ? 'text-blue-700' : 'text-gray-900'}`}>
                {faq.question}
              </h3>
              <div className={`p-2 rounded-full transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'bg-blue-100 rotate-180' : 'bg-gray-100'}`}>
                <ChevronDown className={`w-5 h-5 ${openIndex === index ? 'text-blue-600' : 'text-gray-500'}`} />
              </div>
            </button>
            <div 
              className={`px-5 sm:px-6 transition-all duration-300 overflow-hidden ${
                openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'
              }`}
            >
              <div className="h-px w-full bg-gray-100 mb-4"></div>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-slate-50 border border-slate-200 p-8 rounded-3xl text-center">
        <h4 className="text-lg font-bold text-gray-900 mb-2">Still have questions?</h4>
        <p className="text-gray-600 mb-6">Our AI Legal Advice Index is designed to answer specific procedural questions.</p>
        <button className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-6 rounded-xl transition-colors">
          Ask the Legal AI Chatbot
        </button>
      </div>
    </div>
  );
}
