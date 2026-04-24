/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import API from "../app/services/api";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sku: string;
  availability: boolean;
};

type ProductForm = {
  name: string;
  description: string;
  price: string;
  image: string;
  sku: string;
  availability: boolean;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  // CREATE MODAL STATE
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    price: "",
    image: "",
    sku: "",
    availability: true,
  });

  // FETCH PRODUCTS
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get(`/products?q=${q}`);
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // HANDLE INPUT
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // CREATE PRODUCT
  const handleCreate = async () => {
    try {
      await API.post("/products", {
        ...form,
        price: Number(form.price),
      });

      toast.success("Product created 🎉");
      setShowModal(false);

      // reset form
      setForm({
        name: "",
        description: "",
        price: "",
        image: "",
        sku: "",
        availability: true,
      });

      fetchProducts(); 
    } catch (err) {
      console.error(err);
      toast.error("Create failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white py-10 px-6 text-center shadow">
        <h1 className="text-3xl font-bold">Product Listing</h1>
        <p className="text-sm mt-2 opacity-80">
          Browse, search, and manage products
        </p>
      </div>

      <div className="p-6 max-w-6xl mx-auto">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6 gap-4">
          
          {/* SEARCH */}
          <input
            placeholder="🔍 Search products..."
            className="w-full border border-gray-300 text-gray-900 focus:border-blue-500 p-3 rounded-lg shadow-sm"
            onChange={(e) => setQ(e.target.value)}
          />

          {/* ADD BUTTON */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            + Add
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        {/* EMPTY */}
        {!loading && products.length === 0 && (
          <p className="text-center text-gray-500">No products found</p>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <Link href={`/product/${p.id}`} key={p.id}>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer overflow-hidden">
                
                <Image
                  src={p.image}
                  alt={p.name}
                  width={640}
                  height={320}
                  className="h-44 w-full object-cover"
                />

                <div className="p-4">
                  <h2 className="font-semibold text-amber-950 text-lg truncate">
                    {p.name}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {p.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-blue-600 font-bold">
                      ₹{p.price}
                    </p>

                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        p.availability
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {p.availability ? "In Stock" : "Out"}
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">

          <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl w-96 shadow-xl border">

            <h2 className="text-lg text-black font-semibold mb-4">
              Add Product
            </h2>

            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border border-gray-700 text-gray-600 p-2 w-full mb-2 rounded" />
            <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border border-gray-700 text-gray-600 p-2 w-full mb-2 rounded" />
            <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="border border-gray-700 text-gray-600 p-2 w-full mb-2 rounded" />
            <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="border border-gray-700 text-gray-600 p-2 w-full mb-2 rounded" />
           

            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Create
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}