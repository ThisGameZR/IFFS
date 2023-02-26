import React from "react";

export default function SuggestionCard({
  issue,
  suggestion,
  sentiment,
  type,
}: {
  issue: string;
  suggestion: string;
  sentiment: "Positive" | "Negative";
  type: "UX" | "UI";
}) {
  const arr =
    suggestion
      .split(/\d+\. /)
      .filter(Boolean)
      .map((item) => item.trim()) || [];
  return (
    <div className="suggestion-card">
      <div className="problem">
        <h4>Problem</h4>
        <p>{issue}</p>
        <div className="badges">
          <div className={"badge " + sentiment}>{sentiment}</div>
          <div className={"type " + type}>{type}</div>
        </div>
      </div>
      <div className="suggestion">
        <h4>Our Suggestion</h4>
        {suggestion.includes("1.") ? (
          <ol>
            {arr.map((a) => {
              return <li>{a}</li>;
            })}
          </ol>
        ) : (
          <p>{suggestion}</p>
        )}
      </div>
    </div>
  );
}
