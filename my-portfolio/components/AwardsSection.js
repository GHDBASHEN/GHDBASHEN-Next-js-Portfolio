import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import AnimatedBackground from './AnimatedBackground';

const AwardItem = ({ award, index, isDarkMode }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className={`p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'bg-gray-900/40 border-gray-700 hover:border-amber-500/50' : 'bg-white/60 border-gray-200 hover:border-amber-400'}`}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-full border-2 border-amber-500/30 p-1">
             <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src={award.imageUrl}
                  alt={award.title}
                  fill
                  className="object-cover"
                />
             </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{award.title}</h3>
              <span className="text-amber-500 font-mono font-bold text-lg">{award.year}</span>
            </div>
            <p className="text-amber-600 font-medium mb-2 uppercase tracking-wide text-sm">{award.organization}</p>
            {award.description && (
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {award.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AwardsSection({ awards }) {
  const { isDarkMode } = useTheme();

  return (
    <section id="awards" className="relative py-20 overflow-hidden">
      <AnimatedBackground />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
           <div className="bg-amber-500/10 p-3 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-amber-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-2.25a1.125 1.125 0 00-1.125 1.125V18.75m9 0a3.375 3.375 0 01-3.375-3.375V15m-9 3.75a3.375 3.375 0 003.375-3.375V15m1.5 0v-.75c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v.75m-6.75 2.25H12m0 0h.008v.008H12v-.008z" />
              </svg>
           </div>
          <h2 className={`text-4xl md:text-5xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Awards & Recognitions
          </h2>
          <p className="text-gray-500 mt-4 text-lg">Honors and achievements throughout my journey</p>
        </div>
        
        {awards.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {awards.map((award, index) => (
              <AwardItem key={award._id} award={award} index={index} isDarkMode={isDarkMode} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 italic">No awards added yet.</p>
        )}
      </div>
    </section>
  );
}
