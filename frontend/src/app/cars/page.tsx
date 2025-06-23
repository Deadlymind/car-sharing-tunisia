import { fetchCars } from "@/lib/api";

export default async function CarsPage() {
  const cars = await fetchCars();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Available Cars</h1>
      <ul className="space-y-3">
        {cars.map((c: any) => (
          <li key={c.id} className="border p-4 rounded">
            <div className="font-medium">
              {c.make} {c.model} ({c.year})
            </div>
            <div className="text-sm text-gray-600">
              {c.price_per_day} DT / day
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
