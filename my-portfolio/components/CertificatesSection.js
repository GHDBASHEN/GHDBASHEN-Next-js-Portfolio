import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import AnimatedBackground from './AnimatedBackground';

const CertificateCard = ({ cert, index, isDarkMode }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={`group relative overflow-hidden rounded-xl shadow-lg border transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/20 ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={cert.imageUrl}
            alt={cert.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
             {cert.certificateUrl && (
               <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-white text-sm font-medium underline">View Certificate</a>
             )}
          </div>
        </div>
        <div className="p-6">
          <p className="text-cyan-500 text-xs font-bold uppercase tracking-wider mb-2">{cert.issuer}</p>
          <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{cert.title}</h3>
          <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{cert.issueDate}</p>
          {cert.description && (
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {cert.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function CertificatesSection({ certificates }) {
  const { isDarkMode } = useTheme();

  return (
    <section id="certificates" className="relative py-20 overflow-hidden">
      <AnimatedBackground />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-cyan-500 font-semibold mb-2 uppercase tracking-widest">Credentials</p>
          <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Certificates
          </h2>
          <div className="w-24 h-1 bg-cyan-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <CertificateCard key={cert._id} cert={cert} index={index} isDarkMode={isDarkMode} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 italic">No certificates added yet.</p>
        )}
      </div>
    </section>
  );
}
