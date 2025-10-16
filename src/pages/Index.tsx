import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type DifficultyLevel = 'easy' | 'medium' | 'extreme';

interface Dare {
  text: string;
  difficulty: DifficultyLevel;
  category: string;
}

const dares: Dare[] = [
  { text: "Поцелуй партнёра в шею на 10 секунд", difficulty: "easy", category: "Романтика" },
  { text: "Сделай стриптиз под музыку", difficulty: "medium", category: "Танцы" },
  { text: "Расскажи свою самую откровенную фантазию", difficulty: "medium", category: "Признания" },
  { text: "Массаж с маслом для партнёра 5 минут", difficulty: "easy", category: "Массаж" },
  { text: "Сыграй сцену из фильма для взрослых", difficulty: "extreme", category: "Ролевая игра" },
  { text: "Танец на коленях у партнёра 1 минуту", difficulty: "medium", category: "Танцы" },
  { text: "Признайся в самом смелом желании прямо сейчас", difficulty: "easy", category: "Признания" },
  { text: "Покажи свой лучший соблазнительный танец", difficulty: "medium", category: "Танцы" },
  { text: "Организуй мини-фотосессию для партнёра в белье", difficulty: "extreme", category: "Фото" },
  { text: "Придумай и расскажи эротический рассказ на ходу", difficulty: "extreme", category: "Творчество" },
  { text: "Сделай чувственный массаж губами партнёру", difficulty: "medium", category: "Массаж" },
  { text: "Отыграй роль доминанта/подчинённого 5 минут", difficulty: "extreme", category: "Ролевая игра" },
  { text: "Шёпотом расскажи партнёру что хочешь сейчас", difficulty: "easy", category: "Признания" },
  { text: "Медленный стриптиз с завязанными глазами", difficulty: "extreme", category: "Танцы" },
  { text: "Нарисуй на теле партнёра помадой", difficulty: "medium", category: "Творчество" },
];

const Index = () => {
  const [currentDare, setCurrentDare] = useState<Dare | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomDare = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      const filteredDares = selectedDifficulty === 'all' 
        ? dares 
        : dares.filter(dare => dare.difficulty === selectedDifficulty);
      
      const randomDare = filteredDares[Math.floor(Math.random() * filteredDares.length)];
      setCurrentDare(randomDare);
      setIsAnimating(false);
    }, 300);
  };

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'easy': return 'from-green-400 to-cyan-400';
      case 'medium': return 'from-purple-400 to-pink-400';
      case 'extreme': return 'from-red-500 to-orange-500';
    }
  };

  const getDifficultyLabel = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'easy': return 'Легко';
      case 'medium': return 'Средне';
      case 'extreme': return 'Экстрим';
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-bg bg-clip-text text-transparent neon-text">
            Фанты +18
          </h1>
          <p className="text-gray-400 text-lg md:text-xl">Разогрей вечеринку 🔥</p>
        </header>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <Button
              onClick={() => setSelectedDifficulty('all')}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedDifficulty === 'all'
                  ? 'gradient-bg neon-glow text-white font-semibold'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Все уровни
            </Button>
            <Button
              onClick={() => setSelectedDifficulty('easy')}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedDifficulty === 'easy'
                  ? 'bg-gradient-to-r from-green-400 to-cyan-400 neon-glow text-black font-semibold'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon name="Smile" className="mr-2" size={20} />
              Легко
            </Button>
            <Button
              onClick={() => setSelectedDifficulty('medium')}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedDifficulty === 'medium'
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 neon-glow text-black font-semibold'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon name="Zap" className="mr-2" size={20} />
              Средне
            </Button>
            <Button
              onClick={() => setSelectedDifficulty('extreme')}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedDifficulty === 'extreme'
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 neon-glow text-white font-semibold'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon name="Flame" className="mr-2" size={20} />
              Экстрим
            </Button>
          </div>

          {currentDare && (
            <Card 
              className={`gradient-border mb-8 transition-all duration-300 ${
                isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100 animate-slide-up'
              }`}
            >
              <div className="gradient-border-inner p-8 md:p-12">
                <div className="flex items-center justify-between mb-6">
                  <span className={`px-4 py-2 rounded-full bg-gradient-to-r ${getDifficultyColor(currentDare.difficulty)} text-black font-semibold text-sm`}>
                    {getDifficultyLabel(currentDare.difficulty)}
                  </span>
                  <span className="text-gray-400 text-sm">{currentDare.category}</span>
                </div>
                <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed">
                  {currentDare.text}
                </p>
              </div>
            </Card>
          )}

          <div className="text-center">
            <Button
              onClick={getRandomDare}
              className="px-12 py-6 text-xl font-bold rounded-full gradient-bg neon-glow hover:scale-105 transition-transform duration-200"
            >
              <Icon name="Shuffle" className="mr-3" size={24} />
              {currentDare ? 'Новый фант' : 'Начать игру'}
            </Button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-center mb-6 gradient-bg bg-clip-text text-transparent">
            Правила игры
          </h2>
          <div className="grid gap-4">
            <Card className="gradient-border">
              <div className="gradient-border-inner p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Users" className="text-cyan-400 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-white">Для компании 18+</h3>
                    <p className="text-gray-400">Игра предназначена только для совершеннолетних участников</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="gradient-border">
              <div className="gradient-border-inner p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Heart" className="text-pink-400 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-white">Обоюдное согласие</h3>
                    <p className="text-gray-400">Все участники должны быть согласны на выполнение заданий</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="gradient-border">
              <div className="gradient-border-inner p-6">
                <div className="flex items-start gap-4">
                  <Icon name="ShieldCheck" className="text-purple-400 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-white">Можно отказаться</h3>
                    <p className="text-gray-400">Любой участник может отказаться от задания без объяснений</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
