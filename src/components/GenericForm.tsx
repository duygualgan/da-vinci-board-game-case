/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { mutate } from "swr";
import { toast } from "react-toastify";

export type GenericItem = Record<string, any> & { id?: number };

interface GenericFormProps {
  initialData: GenericItem; 
  fields: { name: string; label: string; type?: string }[]; 
  apiUrl: string; 
  editingItem?: GenericItem | null; 
  onFinish?: () => void; 
}

function GenericForm({
  initialData,
  fields,
  apiUrl,
  editingItem,
  onFinish,
}: GenericFormProps) {
  const [formData, setFormData] = useState<GenericItem>(initialData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingItem) setFormData(editingItem);
  }, [editingItem]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "userId" ? Number(value) : value,
    }));
  };

  const handleReset = () => setFormData(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingItem ? `${apiUrl}/${editingItem.id}` : apiUrl;
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();

      mutate(
        apiUrl,
        (items: GenericItem[] = []) => {
          if (editingItem) {
            return items.map((i) =>
              i.id === editingItem.id ? { ...i, ...formData } : i
            );
          } else {
            return [{ ...formData, id: data.id }, ...items];
          }
        },
        false
      );

      toast.success(editingItem ? "Updated successfully!" : "Created successfully!");
      handleReset();
      onFinish?.();
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const isFormEmpty = Object.entries(formData).every(
    ([key, value]) => value === initialData[key]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {editingItem ? "Edit" : "Create"}
      </h2>

      {fields.map((field) =>
        field.type === "textarea" ? (
          <textarea
            key={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.label}
            required
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        ) : (
          <input
            key={field.name}
            type={field.type || "text"}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.label}
            required
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        )
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex-1"
        >
          {loading
            ? editingItem
              ? "Updating..."
              : "Creating..."
            : editingItem
            ? "Update"
            : "Create"}
        </button>

        {!isFormEmpty && (
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition flex-1"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}

export default GenericForm;
