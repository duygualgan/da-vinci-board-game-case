interface ActionButtonsProps<T> {
  item: T;
  onEdit?: (item: T) => void;
  onDelete?: (id: number) => void;
}

function ActionButtons<T extends { id?: number }>({
  item,
  onEdit,
  onDelete,
}: ActionButtonsProps<T>) {
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
          if (item.id) onDelete?.(item.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default ActionButtons;
