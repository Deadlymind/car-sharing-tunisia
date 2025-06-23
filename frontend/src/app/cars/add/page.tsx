"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCarPage() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2020);
  const [price, setPrice] = useState(100);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/cars/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          owner: 2, // demo user id (hard-coded for now)
          make,
          model,
          year,
          price_per_day: price,
        }),
      }
    );

    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem("accessToken");
        router.push("/login");
      } else {
        setError("Failed to add");
      }
      return;
    }
    router.push("/cars");
  }

  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 border p-6 rounded shadow"
      >
        <h1 className="text-2xl font-semibold text-center">Add Car</h1>

        {error && <div className="text-red-600 text-sm text-center">{error}</div>}

        <input
          className="w-full border p-2 rounded"
          placeholder="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          required
        />
        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Price / day"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
        >
          Save
        </button>
      </form>
    </main>
  );
}
