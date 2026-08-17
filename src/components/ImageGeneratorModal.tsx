import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  Download, 
  Copy, 
  Check, 
  Layers, 
  Image as ImageIcon, 
  Maximize2, 
  RefreshCw, 
  Sliders, 
  Wand2,
  AlertCircle
} from 'lucide-react';
import { sound } from '../utils/sound';

interface ImageGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageGeneratorModal: React.FC<ImageGeneratorModalProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState<string>('3D голографическая воронка amoCRM с светящимися узлами телефонии Sipuni, WhatsApp чатом и аналитикой в темно-синем неоновом стиле');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3'>('16:9');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const presets = [
    {
      title: 'Голограмма amoCRM 3D',
      prompt: 'Футуристический 3D интерфейс amoCRM в виде голограммы над темным рабочим столом, синие и фиолетовые неоновые линии, карточки сделок, высокая детализация',
      ratio: '16:9' as const,
    },
    {
      title: 'ИИ-Квалификатор WhatsApp',
      prompt: 'Премиальный смартфон с открытым бизнес-чатом WhatsApp, зеленый верифицированный бейдж WABA, карточки квалификации лида и графики конверсии, изометрия 4K',
      ratio: '1:1' as const,
    },
    {
      title: 'Телефония Sipuni + Речевая аналитика',
      prompt: 'Высокотехнологичный визуализатор звуковых волн звонка клиента, скоринг скрипта продаж 98%, неоновый интерфейс телефонии, темный фон, cinema 4D render',
      ratio: '16:9' as const,
    },
    {
      title: 'Архитектура сквозной аналитики',
      prompt: '3D граф потока данных: реклама Яндекс.Директ -> amoCRM -> 1С Предприятие -> Дашборд прибыли, стеклянные светящиеся трубы с золотыми частицами',
      ratio: '16:9' as const,
    }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setErrorMsg(null);
    sound.playClick(680, 0.04);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageSize,
          aspectRatio,
          model: 'gemini-3-pro-image-preview',
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Не удалось сгенерировать изображение');
      }

      setGeneratedImage(data.imageUrl);
      sound.playClick(880, 0.05);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Ошибка генерации');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedImage) return;
    navigator.clipboard.writeText(generatedImage);
    setCopied(true);
    sound.playClick(950, 0.03);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `crm-hologram-${imageSize.toLowerCase()}-${Date.now()}.png`;
    link.click();
    sound.playClick(720, 0.03);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#090d1a] border border-blue-500/40 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(59,130,246,0.2)] overflow-hidden z-10 text-white my-8"
        >
          {/* Holographic Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-purple-950/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-white">Генератор визуальных ассетов CRM</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                    gemini-3-pro-image
                  </span>
                </div>
                <p className="text-xs text-slate-400">Генерация фотореалистичных схем, дашбордов и 3D-голограмм (1K / 2K / 4K)</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Controls Column */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Presets */}
              <div>
                <label className="text-xs font-bold text-slate-300 mb-2 block flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Быстрые шаблоны промптов:</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.title}
                      onClick={() => {
                        setPrompt(preset.prompt);
                        setAspectRatio(preset.ratio);
                        sound.playClick(550, 0.02);
                      }}
                      className="text-left p-2.5 rounded-xl bg-slate-900/90 hover:bg-blue-950/40 border border-slate-800 hover:border-blue-500/50 transition-all text-xs cursor-pointer group"
                    >
                      <span className="font-semibold text-slate-200 group-hover:text-blue-300 block">{preset.title}</span>
                      <span className="text-[10px] text-slate-400 truncate block mt-0.5">{preset.prompt}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Input */}
              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 block">
                  Описание изображения (Prompt):
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  placeholder="Опишите желаемое изображение для вашей CRM, воронки или маркетингового отчета..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-xs text-white placeholder-slate-500 transition-all resize-none outline-none"
                />
              </div>

              {/* Affordance: Image Size (1K, 2K, 4K) & Aspect Ratio */}
              <div className="grid grid-cols-2 gap-4">
                {/* Size Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-300 mb-1.5 block flex items-center justify-between">
                    <span>Разрешение (Resolution):</span>
                    <span className="text-[10px] font-mono text-blue-400 font-bold">{imageSize}</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-black/70 border border-slate-800">
                    {(['1K', '2K', '4K'] as const).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setImageSize(size);
                          sound.playClick(600, 0.02);
                        }}
                        className={`py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                          imageSize === size
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aspect Ratio Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-300 mb-1.5 block flex items-center justify-between">
                    <span>Соотношение (Aspect):</span>
                    <span className="text-[10px] font-mono text-blue-400 font-bold">{aspectRatio}</span>
                  </label>
                  <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-black/70 border border-slate-800">
                    {(['1:1', '16:9', '9:16', '4:3'] as const).map((ratio) => (
                      <button
                        key={ratio}
                        type="button"
                        onClick={() => {
                          setAspectRatio(ratio);
                          sound.playClick(600, 0.02);
                        }}
                        className={`py-1.5 rounded-lg text-[11px] font-bold font-mono transition-all cursor-pointer ${
                          aspectRatio === ratio
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <button
                disabled={isLoading || !prompt.trim()}
                onClick={handleGenerate}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Генерация в качестве {imageSize} (Gemini 3 Pro)...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-blue-200" />
                    <span>Сгенерировать визуал {imageSize}</span>
                  </>
                )}
              </button>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Preview Column */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="w-full h-full min-h-[320px] rounded-2xl bg-black/80 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group">
                
                {generatedImage ? (
                  <>
                    <img
                      src={generatedImage}
                      alt={prompt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain max-h-[360px]"
                    />
                    
                    {/* Action Overlay */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/80 backdrop-blur-md p-1.5 rounded-xl border border-white/20">
                      <button
                        onClick={handleCopy}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Скопировать ссылку"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span className="text-[11px]">{copied ? 'Скопировано' : 'Копировать'}</span>
                      </button>

                      <button
                        onClick={handleDownload}
                        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Скачать изображение"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-[11px]">Скачать {imageSize}</span>
                      </button>
                    </div>

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-blue-300 font-bold">
                      {imageSize} · {aspectRatio}
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-200">Готов к генерации</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-xs">
                        Выберите разрешение (1K, 2K, 4K), соотношение сторон и нажмите кнопку генерации.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
