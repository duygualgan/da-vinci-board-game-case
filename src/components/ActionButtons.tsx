import { useState } from "react";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

interface ActionButtonsProps<T> {
  item: T;
  onEdit?: (item: T) => void;
  onDelete?: (id: number) => void;
}

export default function ActionButtons<T extends { id?: number }>({
  item,
  onEdit,
  onDelete,
}: ActionButtonsProps<T>) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex gap-2 mt-4">
      <button
        className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
        onClick={(e) => {
          e.stopPropagation();
          onEdit?.(item);
        }}
      >
        Edit
      </button>

      <button
        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        onClick={(e) => {
          e.stopPropagation();
          setDialogOpen(true);
        }}
      >
        Delete
      </button>

      <DeleteConfirmDialog
        isOpen={isDialogOpen}
        title="Silme Onayı"
        message="Bu postu silmek istediğinize emin misiniz?"
        onCancel={() => setDialogOpen(false)}
        onConfirm={() => {
          setDialogOpen(false);
          if (item.id) onDelete?.(item.id);
        }}
      />
    </div>
  );
}
