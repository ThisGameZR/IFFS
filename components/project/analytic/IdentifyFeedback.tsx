import React from "react";

export default function IdentifyFeedback({
  sentiment,
  text,
  type,
}: {
  sentiment: "Positive" | "Negative";
  text?: string;
  type: "UX" | "UI";
}) {
  return (
    <div className="identify-feedback">
      <div className={"badge " + sentiment}></div>
      <div
        className={
          "title " +
          (sentiment == "Positive"
            ? "positive-feedback"
            : sentiment == "Negative"
            ? "negative-feedback"
            : "neutral-feedback")
        }
      >
        {sentiment}
      </div>
      <div className={"type " + type}>{type}</div>
      <div className="text">{text}</div>
    </div>
  );
}
