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
}: {
  onEdit?: () => void;
  onSave?: () => void;
  onAdd?: () => void;
  onDelete?: () => void;
}) {
  return (
    <>
      <div className="simple-menu">
        {onEdit && (
          <div className="simple-menu-item color-edit" onClick={onEdit}>
            <AiOutlineEdit />
          </div>
        )}
        {onSave && (
          <div className="simple-menu-item color-save" onClick={onSave}>
            <FiSave />
          </div>
        )}
        {onAdd && (
          <div className="simple-menu-item color-add" onClick={onAdd}>
            <AiOutlinePlus />
          </div>
        )}
        {onDelete && (
          <div className="simple-menu-item color-delete" onClick={onDelete}>
            <BsTrash />
          </div>
        )}
      </div>
    </>
  );
}