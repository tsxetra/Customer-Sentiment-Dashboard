
import React, { useEffect, useRef } from 'react';
import { WordCloudWord } from '../types';

declare const d3: any;

interface WordCloudProps {
  words: WordCloudWord[];
}

const WordCloud: React.FC<WordCloudProps> = ({ words }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (words && words.length > 0 && ref.current) {
      const parent = ref.current.parentElement;
      if (!parent) return;

      const width = parent.offsetWidth;
      const height = 300;

      const svg = d3.select(ref.current)
        .attr("width", width)
        .attr("height", height)
        .html(""); // Clear previous render

      const g = svg.append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const maxFreq = d3.max(words, (d: WordCloudWord) => d.value);
      const fontSize = d3.scaleSqrt().domain([0, maxFreq]).range([10, 60]);

      const layout = d3.layout.cloud()
        .size([width, height])
        .words(words.map(d => ({ text: d.text, size: fontSize(d.value) })))
        .padding(5)
        .rotate(() => (~~(Math.random() * 6) - 3) * 30)
        .font("Impact")
        .fontSize((d: any) => d.size)
        .on("end", draw);
      
      layout.start();

      function draw(words: any) {
        const fill = d3.scaleOrdinal(d3.schemeCategory10);
        g.selectAll("text")
          .data(words)
          .enter().append("text")
          .style("font-size", d => `${d.size}px`)
          .style("font-family", "Impact")
          .style("fill", (d, i) => fill(i))
          .attr("text-anchor", "middle")
          .attr("transform", d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
          .text(d => d.text);
      }
    }
  }, [words]);

  return (
    <div className="bg-secondary p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-text-primary">Keyword Cloud</h3>
      <div className="w-full h-[300px]">
        <svg ref={ref}></svg>
      </div>
    </div>
  );
};

export default WordCloud;
