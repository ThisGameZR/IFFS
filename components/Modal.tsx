import useOnClickOutside from "hooks/useOnClickOutside";
import React, { useRef } from "react";
export default function Modal({
  open,
  setOpen,
  title,
  children,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false));
  // handle esc key press to close modal
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  return (
    <div className="modal" style={open ? { display: "block" } : { display: "none" }}>
      <div className="details-modal-overlay"></div>
      <div className="details-modal" ref={ref}>
        <div className="details-modal-title">
          <h1>{title}</h1>
        </div>
        <div className="details-modal-content">{children}</div>
      </div>
    </div>
  );
}
