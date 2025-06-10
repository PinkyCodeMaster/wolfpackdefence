import MainHeader from "@/components/layout/main-header"

export default function Home() {
  return (
      <main className="pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="mt-4 text-gray-600">
            Welcome to your WebTemplate dashboard. This page demonstrates the header with current page indication.
          </p>

          {/* Placeholder content */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Card {i}</h2>
                <p className="text-gray-500">This is a placeholder card to demonstrate the layout.</p>
              </div>
            ))}
          </div>
        </div>
      </main>
  )
}
