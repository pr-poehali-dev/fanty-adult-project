import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

type DifficultyLevel = 'easy' | 'medium' | 'extreme';

interface Dare {
  text: string;
  difficulty: DifficultyLevel;
  category: string;
  duration?: number;
}

const dares: Dare[] = [
  { text: "Поцелуй партнёра в шею", difficulty: "easy", category: "Романтика", duration: 10 },
  { text: "Сделай стриптиз под музыку", difficulty: "medium", category: "Танцы", duration: 60 },
  { text: "Расскажи свою самую откровенную фантазию", difficulty: "medium", category: "Признания", duration: 45 },
  { text: "Массаж с маслом для партнёра", difficulty: "easy", category: "Массаж", duration: 120 },
  { text: "Сыграй сцену из фильма для взрослых", difficulty: "extreme", category: "Ролевая игра", duration: 90 },
  { text: "Танец на коленях у партнёра", difficulty: "medium", category: "Танцы", duration: 60 },
  { text: "Признайся в самом смелом желании прямо сейчас", difficulty: "easy", category: "Признания", duration: 30 },
  { text: "Покажи свой лучший соблазнительный танец", difficulty: "medium", category: "Танцы", duration: 45 },
  { text: "Организуй мини-фотосессию для партнёра в белье", difficulty: "extreme", category: "Фото", duration: 180 },
  { text: "Придумай и расскажи эротический рассказ на ходу", difficulty: "extreme", category: "Творчество", duration: 120 },
  { text: "Сделай чувственный массаж губами партнёру", difficulty: "medium", category: "Массаж", duration: 90 },
  { text: "Отыграй роль доминанта/подчинённого", difficulty: "extreme", category: "Ролевая игра", duration: 300 },
  { text: "Шёпотом расскажи партнёру что хочешь сейчас", difficulty: "easy", category: "Признания", duration: 20 },
  { text: "Медленный стриптиз с завязанными глазами", difficulty: "extreme", category: "Танцы", duration: 90 },
  { text: "Нарисуй на теле партнёра помадой", difficulty: "medium", category: "Творчество", duration: 60 },
];

const Index = () => {
  const [currentDare, setCurrentDare] = useState<Dare | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [isAnimating, setIsAnimating] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const [tempSelectedPlayer, setTempSelectedPlayer] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [players, setPlayers] = useState<string[]>(['Игрок 1', 'Игрок 2', 'Игрок 3', 'Игрок 4', 'Игрок 5', 'Игрок 6']);
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const addPlayer = () => {
    if (newPlayerName.trim() && players.length < 12) {
      setPlayers([...players, newPlayerName.trim()]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (index: number) => {
    if (players.length > 2) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const editPlayer = (index: number, newName: string) => {
    const updated = [...players];
    updated[index] = newName;
    setPlayers(updated);
  };

  const spinRandomizer = () => {
    setIsSpinning(true);
    setTempSelectedPlayer('');
    let spinCount = 0;
    const spinInterval = setInterval(() => {
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      setTempSelectedPlayer(randomPlayer);
      spinCount++;
      if (spinCount > 15) {
        clearInterval(spinInterval);
        setIsSpinning(false);
      }
    }, 100);
  };

  const confirmPlayerSelection = () => {
    if (tempSelectedPlayer) {
      setSelectedPlayer(tempSelectedPlayer);
    }
  };

  const getRandomDare = () => {
    setIsAnimating(true);
    setIsTimerRunning(false);
    
    setTimeout(() => {
      const filteredDares = selectedDifficulty === 'all' 
        ? dares 
        : dares.filter(dare => dare.difficulty === selectedDifficulty);
      
      const randomDare = filteredDares[Math.floor(Math.random() * filteredDares.length)];
      setCurrentDare(randomDare);
      setTimeLeft(randomDare.duration || 60);
      setIsAnimating(false);
    }, 300);
  };

  const startTimer = () => {
    if (currentDare && timeLeft > 0) {
      setIsTimerRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(currentDare?.duration || 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

          <Card className="gradient-border mb-8">
            <div className="gradient-border-inner p-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-white">Игроки</h3>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="px-3 py-1 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-sm">
                        <Icon name="Settings" size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-2 border-purple-500 text-white max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-2xl gradient-bg bg-clip-text text-transparent">Управление игроками</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="flex gap-2">
                          <Input
                            value={newPlayerName}
                            onChange={(e) => setNewPlayerName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                            placeholder="Имя игрока"
                            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                          />
                          <Button
                            onClick={addPlayer}
                            disabled={!newPlayerName.trim() || players.length >= 12}
                            className="px-4 bg-gradient-to-r from-purple-400 to-pink-400 text-black font-semibold"
                          >
                            <Icon name="Plus" size={20} />
                          </Button>
                        </div>
                        <div className="text-sm text-gray-400">
                          {players.length}/12 игроков (минимум 2)
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {players.map((player, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
                              <Input
                                value={player}
                                onChange={(e) => editPlayer(index, e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white flex-1"
                              />
                              <Button
                                onClick={() => removePlayer(index)}
                                disabled={players.length <= 2}
                                className="px-3 bg-red-600 hover:bg-red-700 text-white"
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="mb-4">
                  <div className="mb-2 text-sm text-gray-400">
                    {selectedPlayer ? `Выбран: ${selectedPlayer}` : 'Никто не выбран'}
                  </div>
                  <div className={`text-4xl font-bold gradient-bg bg-clip-text text-transparent mb-4 min-h-[3rem] flex items-center justify-center ${
                    isSpinning ? 'animate-glow-pulse' : ''
                  }`}>
                    {tempSelectedPlayer || '?'}
                  </div>
                </div>
                <div className="flex gap-3 justify-center flex-wrap">
                  <Button
                    onClick={spinRandomizer}
                    disabled={isSpinning}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-black font-semibold hover:scale-105 transition-transform"
                  >
                    <Icon name="Shuffle" className="mr-2" size={20} />
                    {isSpinning ? 'Выбираем...' : 'Выбрать'}
                  </Button>
                  {tempSelectedPlayer && !isSpinning && (
                    <Button
                      onClick={confirmPlayerSelection}
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 text-black font-semibold hover:scale-105 transition-transform"
                    >
                      <Icon name="Check" className="mr-2" size={20} />
                      Принять
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>

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
                <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed mb-6">
                  {currentDare.text}
                </p>
                
                <div className="border-t border-gray-700 pt-6">
                  <div className="text-center mb-4">
                    <div className={`text-5xl font-bold mb-4 ${
                      timeLeft <= 10 ? 'text-red-500 animate-glow-pulse' : 'gradient-bg bg-clip-text text-transparent'
                    }`}>
                      {formatTime(timeLeft)}
                    </div>
                    <div className="flex gap-3 justify-center flex-wrap">
                      {!isTimerRunning ? (
                        <Button
                          onClick={startTimer}
                          className="px-6 py-2 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 text-black font-semibold hover:scale-105 transition-transform"
                        >
                          <Icon name="Play" className="mr-2" size={18} />
                          Старт
                        </Button>
                      ) : (
                        <Button
                          onClick={pauseTimer}
                          className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold hover:scale-105 transition-transform"
                        >
                          <Icon name="Pause" className="mr-2" size={18} />
                          Пауза
                        </Button>
                      )}
                      <Button
                        onClick={resetTimer}
                        className="px-6 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                      >
                        <Icon name="RotateCcw" className="mr-2" size={18} />
                        Сброс
                      </Button>
                    </div>
                  </div>
                </div>
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
      </div>
    </div>
  );
};

export default Index;