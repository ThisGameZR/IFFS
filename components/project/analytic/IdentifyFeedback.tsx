import React from "react";

export default function IdentifyFeedback({ type, text }: { type: "Positive" | "Negative" | "Neutral"; text?: string }) {
  return (
    <div className="identify-feedback">
      <div className={"badge " + type}></div>
      <div
        className={
          "title " +
          (type == "Positive" ? "positive-feedback" : type == "Negative" ? "negative-feedback" : "neutral-feedback")
        }
      >
        {type}
      </div>
      <div className="text">{text}</div>
    </div>
  );
}
