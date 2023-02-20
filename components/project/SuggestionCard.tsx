import React from "react";

export default function SuggestionCard({ issue, suggestion }: { issue: string; suggestion: string }) {
  return (
    <div className="suggestion-card">
      <div className="problem">
        <h4>Problem</h4>
        <p>{issue}</p>
        <div className="badge">Negative</div>
      </div>
      <div className="suggestion">
        <h4>Our Suggestion</h4>
        <p>{suggestion}</p>
      </div>
    </div>
  );
}
