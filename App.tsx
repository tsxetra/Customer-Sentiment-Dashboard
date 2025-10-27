
import React, { useState, useCallback } from 'react';
import { AnalysisResult } from './types';
import { analyzeReviews } from './services/geminiService';
import SentimentChart from './components/SentimentChart';
import WordCloud from './components/WordCloud';
import ExecutiveSummary from './components/ExecutiveSummary';
import Chatbot from './components/Chatbot';
import { BotIcon, LoaderIcon, ServerCrashIcon } from './components/icons';

const App: React.FC = () => {
  const [rawReviews, setRawReviews] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleAnalyze = useCallback(async () => {
    if (!rawReviews.trim()) return;

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeReviews(rawReviews);
      setAnalysisResult(result);
    } catch (e) {
      console.error(e);
      setError('Failed to analyze reviews. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [rawReviews]);
  
  const placeholderText = `Paste your customer reviews here. For example:\n\n"The battery life on this new phone is incredible! Lasts me two full days." - 2023-10-28\n"I'm really disappointed with the camera quality in low light. The photos are grainy." - 2023-10-27\n"Customer support was very helpful and resolved my issue quickly. Five stars!" - 2023-10-26\n"The app keeps crashing after the latest update. It's very frustrating." - 2023-10-25`;

  return (
    <div className="min-h-screen bg-primary font-sans">
      <header className="bg-secondary p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center text-accent">Customer Sentiment Dashboard</h1>
      </header>
      
      <main className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">1. Paste Customer Reviews</h2>
          <textarea
            value={rawReviews}
            onChange={(e) => setRawReviews(e.target.value)}
            placeholder={placeholderText}
            className="w-full h-96 p-4 bg-secondary border border-highlight rounded-lg resize-none focus:ring-2 focus:ring-accent focus:outline-none text-text-secondary"
            disabled={isLoading}
          />
          <button
            onClick={handleAnalyze}
            disabled={!rawReviews.trim() || isLoading}
            className="px-6 py-3 bg-accent text-primary font-bold rounded-lg shadow-lg hover:bg-sky-400 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
          >
            {isLoading ? <><LoaderIcon /> Analyzing...</> : 'Generate Report'}
          </button>
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">2. View Analysis</h2>
          {isLoading && (
             <div className="flex flex-col items-center justify-center h-full bg-secondary rounded-lg p-8">
                <LoaderIcon size={8} />
                <p className="mt-4 text-text-secondary animate-pulse">AI is analyzing sentiment, please wait...</p>
             </div>
          )}
          {error && (
            <div className="flex flex-col items-center justify-center h-full bg-red-900/50 border border-red-700 rounded-lg p-8">
                <ServerCrashIcon />
                <p className="mt-4 text-text-primary font-semibold">An Error Occurred</p>
                <p className="text-text-secondary text-center mt-2">{error}</p>
            </div>
          )}
          {!isLoading && !error && !analysisResult && (
            <div className="flex items-center justify-center h-full bg-secondary rounded-lg p-8 text-text-secondary">
              Your analysis report will appear here.
            </div>
          )}
          {analysisResult && (
            <div className="space-y-8">
              <ExecutiveSummary summary={analysisResult.summary} />
              <SentimentChart data={analysisResult.sentimentTrend} />
              <WordCloud words={analysisResult.wordCloud} />
            </div>
          )}
        </div>
      </main>

       <button
        onClick={() => setIsChatOpen(prev => !prev)}
        className="fixed bottom-6 right-6 bg-accent text-primary p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
        aria-label="Toggle Chatbot"
      >
        <BotIcon />
      </button>
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default App;
