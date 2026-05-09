/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Phone, RefreshCw, Copy, Check } from 'lucide-react';
import { generateExcuse, Excuse } from './services/geminiService';

export default function App() {
  const [excuse, setExcuse] = useState<Excuse | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setCopied(false);
    try {
      const result = await generateExcuse();
      setExcuse(result);
    } catch (error) {
      console.error("Failed to generate excuse:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (excuse) {
      navigator.clipboard.writeText(excuse.excuse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-brand-pink/30"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: '110vh',
              scale: Math.random() * 0.5 + 0.5,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: '-10vh',
              rotate: Math.random() * 360 + 720
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
          >
            <Heart size={32 + Math.random() * 40} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <header className="text-center mb-10">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block p-4 rounded-full bg-white shadow-xl mb-4"
          >
            <Phone size={40} className="text-brand-hotpink" />
          </motion.div>
          <h1 className="text-4xl font-display font-extrabold text-brand-hotpink mb-2 tracking-tight">
            CrushCall
          </h1>
          <p className="font-accent text-brand-accent text-xl">
            Excuses for the weak (and in love) 
          </p>
        </header>

        <div className="glass-card rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4">
            <Sparkles className="text-brand-pink animate-pulse" />
          </div>

          <AnimatePresence mode="wait">
            {!excuse && !loading ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <p className="text-gray-500 font-medium mb-6">
                  Need a reason to hit that call button?
                </p>
                <button
                  id="btn-start"
                  onClick={handleGenerate}
                  className="pink-gradient text-white font-display font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-brand-pink/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 mx-auto w-full"
                >
                  Give me an excuse ✨
                </button>
              </motion.div>
            ) : loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw size={48} className="text-brand-hotpink" />
                </motion.div>
                <p className="mt-4 font-accent text-brand-accent">Manifesting cuteness...</p>
              </motion.div>
            ) : (
              <motion.div
                key="excuse"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col gap-6"
              >
                <div className="flex justify-between items-center">
                  <span className="bg-brand-pink/20 text-brand-hotpink px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-sans">
                    {excuse?.category}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} className="text-gray-400" />}
                    </button>
                  </div>
                </div>

                <blockquote className="text-2xl font-display font-bold text-gray-800 leading-tight italic">
                  "{excuse?.excuse}"
                </blockquote>

                <div className="flex flex-col gap-3 pt-4">
                  <button
                    onClick={handleGenerate}
                    className="border-2 border-brand-pink text-brand-hotpink hover:bg-brand-pink/10 font-display font-bold py-3 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={18} />
                    Try another one
                  </button>
                  <a
                    href="tel:123-456-7890"
                    className="pink-gradient text-white font-display font-bold py-4 px-6 rounded-2xl shadow-lg hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
                  >
                    <Phone size={20} />
                    Call them now!
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="mt-8 text-center text-brand-accent/60 text-sm font-medium">
          Made with ✨ for your happy heart
        </footer>
      </motion.div>
    </div>
  );
}

