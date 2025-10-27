
import React, { useMemo } from 'react';

declare const marked: {
  parse: (markdown: string) => string;
};

interface ExecutiveSummaryProps {
  summary: string;
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ summary }) => {
  const htmlSummary = useMemo(() => {
    if (typeof marked !== 'undefined') {
      return marked.parse(summary);
    }
    return summary;
  }, [summary]);

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2 text-text-primary">Executive Summary & Actionable Insights</h3>
      <div 
        className="prose prose-invert prose-p:text-text-secondary prose-li:text-text-secondary prose-headings:text-text-primary prose-strong:text-accent max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlSummary }} 
      />
    </div>
  );
};

export default ExecutiveSummary;
