import React, { useState, useEffect, useRef } from 'react'; 
import { Play, Pause, ChevronRight } from 'lucide-react';
import bgMusic from './music/ankhon.mp3';
import CardSection from './components/CardSection';
import PhotoGallery from './components/UnoCardsPage';
import FinalComponent from './components/FinalComponent';

const FlyingBalloons: React.FC = () => {
  return (
    <>
      <div className="balloon balloon-1"></div>
      <div className="balloon balloon-2"></div>
      <div className="balloon balloon-3"></div>
      <div className="balloon balloon-4"></div>
      <div className="balloon balloon-5"></div>
    </>
  );
};

const InitialCard: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const messages = [
    "Heyyyyy Parvati!!!!!",
    "Playing UNO  means I meant it by playing it in my Wayyyy",
    "So..........!",
    "I Have a little surprise waiting for you....."
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
  const [componentFade, setComponentFade] = useState<'in' | 'out'>('in');

  useEffect(() => {
    // Only auto-advance if we haven't reached the last message.
    if (currentMessageIndex < messages.length - 1) {
      const timer = setTimeout(() => {
        setFadeState('out');
        setTimeout(() => {
          setCurrentMessageIndex(currentMessageIndex + 1);
          setFadeState('in');
        }, 1000); // wait for fade-out before switching
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, messages.length]);

  const handleNextClick = () => {
    // Fade out the entire component before navigating.
    setComponentFade('out');
    setTimeout(() => {
      onNext();
    }, 500); // should match your CSS transition duration
  };

  return (
    <div className={`relative flex items-center justify-center transition-opacity duration-500 ${componentFade === 'in' ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-3xl shadow-2xl p-8 w-80 h-96 transform transition-all duration-500 hover:scale-105">
        {/* UNO Logo */}
        <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-inner">
          <span className="text-red-600 font-bold text-3xl">UNO</span>
        </div>
        
        {/* Animated Message */}
        <div className="h-32 flex items-center justify-center">
          <h1 
            className={`text-white text-3xl font-bold text-center transition-opacity duration-1000 ${fadeState === 'in' ? 'opacity-100' : 'opacity-0'}`}
          >
            {messages[currentMessageIndex]}
          </h1>
        </div>
        
        {/* Continue Button: only show if we are on the last message */}
        {currentMessageIndex === messages.length - 1 && (
          <div className="mt-8 text-center">
            <button 
              onClick={handleNextClick}
              className="bg-yellow-400 hover:bg-yellow-300 text-red-600 font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center mx-auto"
            >
              Continue <ChevronRight className="ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const MusicCard: React.FC<{
  onNext: () => void;
  isPlaying: boolean;
  togglePlay: () => void;
}> = ({ onNext, isPlaying, togglePlay }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      className={`relative perspective-1000 transition-opacity duration-1000 ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="bg-blue-600 rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105 max-w-md mx-auto">
        {/* UNO Logo */}
        <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 border-8 border-white shadow-inner">
          <span className="text-blue-600 font-bold text-4xl">UNO</span>
        </div>
        
        <h2 className="text-white text-3xl font-bold text-center mb-6">Lets first play the song Dude....</h2>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-xl">Aankhon Mein Teri</h3>
              <p className="text-white/80">Ajab si ajab si....</p>
            </div>
            <button 
              onClick={togglePlay}
              className="bg-white rounded-full w-12 h-12 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={onNext}
            className="bg-yellow-400 hover:bg-yellow-300 text-blue-600 font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center mx-auto"
          >
            Lessss Gooooooo! <ChevronRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [currentSection, setCurrentSection] = useState<'initial' | 'music' | 'cards' | 'gallery' | 'final'>('initial');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSectionChange = (
    section: 'initial' | 'music' | 'cards' | 'gallery' | 'final'
  ) => {
    setCurrentSection(section);
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden flex items-center justify-center transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Persistent Audio Element: Always mounted */}
      <audio ref={audioRef} src={bgMusic} loop />

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"></div>
      
      {/* Flying Balloons */}
      <FlyingBalloons />

      {/* Animated Blobs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white rounded-full opacity-30 animate-blob"></div>
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-white rounded-full opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full p-4">
        {currentSection === 'initial' && (
          <InitialCard onNext={() => handleSectionChange('music')} />
        )}
        {currentSection === 'music' && (
          <MusicCard
            onNext={() => handleSectionChange('cards')}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
          />
        )}
        {currentSection === 'cards' && (
          <CardSection onNext={() => handleSectionChange('gallery')} />
        )}
        {currentSection === 'gallery' && (
          <PhotoGallery onNext={() => handleSectionChange('final')} />
        )}
        {currentSection === 'final' && <FinalComponent />}
      </div>

      {/* Balloon Styles */}
      <style>{`
        .balloon {
          position: absolute;
          bottom: -100px;
          width: 40px;
          height: 60px;
          border-radius: 50%;
          animation: floatUp 8s linear infinite;
        }
        .balloon:after {
          content: "";
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 20px;
          background: inherit;
        }
        .balloon.balloon-1 {
          left: 10%;
          background: #ff69b4; /* hot pink */
          animation-delay: 0s;
        }
        .balloon.balloon-2 {
          left: 30%;
          background: #1e90ff; /* dodger blue */
          animation-delay: 2s;
        }
        .balloon.balloon-3 {
          left: 50%;
          background: #ffd700; /* gold */
          animation-delay: 4s;
        }
        .balloon.balloon-4 {
          left: 70%;
          background: #32cd32; /* lime green */
          animation-delay: 1s;
        }
        .balloon.balloon-5 {
          left: 85%;
          background: #800080; /* purple */
          animation-delay: 3s;
        }
        @keyframes floatUp {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
