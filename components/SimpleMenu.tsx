import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
export default function SimpleMenu({
  onEdit,
  onSave,
  onAdd,
  onDelete,
  display,
}: {
  onEdit?: () => void;
  onSave?: () => void;
  onAdd?: () => void;
  onDelete?: () => void;
  display: boolean;
}) {
  return (
    <>
      <div className="simple-menu">
        {onEdit && (
          <div
            className="simple-menu-item"
            onClick={onEdit}
            title="Rename"
            style={{
              display: display ? "block" : "none",
            }}
          >
            <AiOutlineEdit />
          </div>
        )}
        {onSave && (
          <div
            className="simple-menu-item"
            onClick={onSave}
            title="Save"
            style={{
              display: display ? "block" : "none",
            }}
          >
            <FiSave />
          </div>
        )}
        {onDelete && (
          <div
            className="simple-menu-item "
            onClick={onDelete}
            title="Delete"
            style={{
              display: display ? "block" : "none",
            }}
          >
            <BsTrash />
          </div>
        )}
        {onAdd && (
          <div
            className="simple-menu-item "
            onClick={onAdd}
            title="Create"
            style={{
              display: display ? "block" : "none",
            }}
          >
            <AiOutlinePlus />
          </div>
        )}
      </div>
    </>
  );
}
