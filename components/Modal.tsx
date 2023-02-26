import useOnClickOutside from "hooks/useOnClickOutside";
import React, { useRef } from "react";
export default function Modal({
  open,
  setOpen,
  title,
  cancel,
  apply,
  children,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  cancel?: () => void;
  apply?: () => void;
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
        {apply && (
          <div className="modal-buttons">
            <button type="button" tabIndex={2} onClick={() => (cancel ? cancel() : setOpen(false))}>
              Cancel
            </button>
            <button type="button" onClick={() => apply()} tabIndex={1}>
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
