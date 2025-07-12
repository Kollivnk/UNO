import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface CardSectionProps {
  onNext: () => void;
}

const CardSection: React.FC<CardSectionProps> = ({ onNext }) => {
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false, false, false]);
  const [showNextButton, setShowNextButton] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Check if the viewport is mobile.
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Trigger the fade-in animation on mount.
  useEffect(() => {
    setLoaded(true);
  }, []);

  const cardMessages = [
  "I talk non-stop, and somehow you always reply with exactly the right words. 🎯",
  "You're quiet, I'm loud — and that balance just works. Like magic. ✨",
  "Even though we’ve never met, chatting with you feels like home. 📱",
  "From classmates to best friends, all through just texts — pretty cool, right? 😄",
  "Parvati, you're proof that distance means nothing when friendship is real. 🫶"
];


  // Cartoon-themed styles for each card.
  const cardStyles = [
    { front: "bg-gradient-to-br from-red-400 to-red-600", text: "text-red-600" },
    { front: "bg-gradient-to-br from-blue-400 to-blue-600", text: "text-blue-600" },
    { front: "bg-gradient-to-br from-green-400 to-green-600", text: "text-green-600" },
    { front: "bg-gradient-to-br from-yellow-400 to-yellow-600", text: "text-yellow-600" },
    { front: "bg-gradient-to-br from-purple-400 to-purple-600", text: "text-purple-600" },
  ];

  // Slight rotation for a playful look.
  const rotations = ["-5", "3", "-2", "4", "0"];

  const handleCardClick = (index: number) => {
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = !newFlippedCards[index];
    setFlippedCards(newFlippedCards);

    // Show the next button when all cards have been flipped.
    if (newFlippedCards.every((card) => card)) {
      setShowNextButton(true);
    }
  };

  // Slide step defines how far the deck moves per click.
  const slideStep = 100;

  const slideLeft = () => {
    setSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const slideRight = () => {
    setSlideIndex((prev) => Math.min(prev + 1, cardStyles.length - 1));
  };

  return (
    <div className={`relative transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
      <h2 className="text-white text-4xl font-extrabold text-center mb-12">
        Special Messages For You
      </h2>
      <div className="relative px-4 md:px-12">
        {/* For mobile, display cards in a column. For larger screens, use a horizontal slider */}
        <div
          className={`flex items-center ${isMobile ? "flex-col" : "flex-row"} transition-transform duration-700 ease-in-out overflow-visible`}
          style={!isMobile ? { transform: `translateX(-${slideIndex * slideStep}px)` } : {}}
        >
          {cardStyles.map((style, index) => (
            <div 
              key={index}
              onClick={() => handleCardClick(index)}
              className={`relative w-64 h-96 cursor-pointer perspective-1000 ${!isMobile && index !== 0 ? "ml-[-40px]" : ""} transition-all duration-500 hover:z-20`}
              style={{ transform: `rotate(${rotations[index]}deg)` }}
            >
              <div 
                className={`absolute w-full h-full rounded-2xl shadow-[0_8px_15px_rgba(0,0,0,0.3)] transition-transform duration-700 transform-style-3d ${flippedCards[index] ? "rotate-y-180" : ""}`}
              >
                {/* Front of the card */}
                <div className={`absolute w-full h-full rounded-2xl border-4 border-white flex flex-col items-center justify-center ${style.front} backface-hidden`}>
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md">
                    <span className={`${style.text} font-extrabold text-2xl`}>❤️</span>
                  </div>
                </div>
                {/* Back of the card */}
                <div className="absolute w-full h-full rounded-2xl bg-white p-6 flex items-center justify-center rotate-y-180 backface-hidden border-4 border-white">
                  <p className="text-gray-800 text-xl font-semibold text-center">
                    {cardMessages[index]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Arrow buttons are only shown on larger screens */}
        {!isMobile && (
          <>
            <button 
              onClick={slideLeft}
              className="absolute top-1/2 left-2 md:left-0 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={slideRight}
              className="absolute top-1/2 right-2 md:right-0 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full z-10"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
      {showNextButton && (
        <div className="text-center mt-12">
          <button 
            onClick={onNext}
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 px-8 rounded-full transition-all duration-300 inline-flex items-center"
          >
            Continue to Gallery <ChevronRight className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CardSection;
