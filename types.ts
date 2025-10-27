
export interface SentimentDataPoint {
  date: string;
  sentiment: number;
}

export interface WordCloudWord {
  text: string;
  value: number;
}

export interface AnalysisResult {
  sentimentTrend: SentimentDataPoint[];
  wordCloud: WordCloudWord[];
  summary: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
