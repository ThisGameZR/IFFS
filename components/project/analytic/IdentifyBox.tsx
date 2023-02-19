import React from "react";

export default function IdentifyBox({
  icon,
  title,
  amount,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  amount: number;
  className?: string;
}) {
  return (
    <div className={"identify-box " + className}>
      <div className="icon">{icon}</div>
      <div className="title">{title}</div>
      <div className="amount">{amount}</div>
      <div className="feedback">FEEDBACK</div>
    </div>
  );
}
