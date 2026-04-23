/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");

  // FETCH PRODUCT
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // OPEN MODAL
  const handleEdit = (field, value) => {
    setEditField(field);
    setEditValue(value);
    setIsModalOpen(true);
  };

  // SAVE UPDATE
  const handleSave = async () => {
    try {
      const updated = {
        ...product,
        [editField]:
          editField === "price" ? Number(editValue) : editValue,
      };

      await API.put(`/products/${id}`, updated);

      setProduct(updated);
      toast.success(`${editField} updated 🎉`);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Update failed ❌");
    }
  };

  // DELETE
  const handleDelete = async () => {
    if (!confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);
      toast.success("Product deleted 🗑️");

      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      console.error(err);
      toast.error("Delete failed ❌");
    }
  };

  if (loading)
    return <p className="p-6 text-center text-gray-500">Loading...</p>;

  if (!product)
    return <p className="p-6 text-center">Product not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      {/* MAIN CARD */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 grid md:grid-cols-2 gap-8">

        {/* IMAGE */}
        <div className="rounded-xl overflow-hidden border">
          <img
            src={product.image}
            className="w-full h-87.5 object-cover hover:scale-105 transition duration-300"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col justify-between">

          <div>

            {/* NAME */}
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-gray-800">
                {product.name}
              </h1>
              <span
                className="cursor-pointer text-blue-500 hover:scale-110 transition"
                onClick={() => handleEdit("name", product.name)}
              >
                ✏️
              </span>
            </div>

            {/* DESCRIPTION */}
            <div className="flex items-start gap-2 mt-3">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
              <span
                className="cursor-pointer text-blue-500 hover:scale-110 transition"
                onClick={() =>
                  handleEdit("description", product.description)
                }
              >
                ✏️
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-2 mt-6">
              <p className="text-2xl font-bold text-blue-600">
                ₹{product.price}
              </p>
              <span
                className="cursor-pointer text-blue-500 hover:scale-110 transition"
                onClick={() => handleEdit("price", product.price)}
              >
                ✏️
              </span>
            </div>

            {/* STATUS */}
            <div className="mt-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.availability
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {product.availability ? "In Stock" : "Out of Stock"}
              </span>
            </div>

          </div>

          {/* DELETE BUTTON */}
          <button
            onClick={handleDelete}
            className="mt-8 bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-lg shadow-md"
          >
            Delete Product
          </button>

        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl w-80 shadow-xl border border-gray-200">
            
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Edit {editField}
            </h2>

            <input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="border border-gray-300 text-black focus:border-blue-500 outline-none p-2 w-full mb-4 rounded-md"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 rounded-md border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                Save
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}