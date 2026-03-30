import "./Suggestion.css";
export const Suggestion = ({ results }: { results: string[] }) => {
  return (
    <div className="suggestions">
      {results.map((result, index) => (
        <div key={index}>{result}</div>
      ))}
    </div>
  );
};
