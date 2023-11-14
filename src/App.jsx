import { useState } from "react"
import { Listbox } from "@headlessui/react"

const currencies = [
  { id: 1, name: "Euro" },
  { id: 2, name: "US Dollar" },
  { id: 3, name: "British Pound" },
  { id: 4, name: "Japanese Yen" },
  { id: 5, name: "Australian Dollar" },
]
function App() {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
  const [otherCurrency, setOtherCurrency] = useState(currencies[1])

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-stone-500">
        <section className="flex flex-col bg-stone-800 md:w-1/2 md:px-0 mx-10 w-full p-2 rounded-lg border-[1px] border-orange-300">
          <h1 className="text-5xl font-light text-orange-300 tracking-wide text-center">
            Currency Converter
          </h1>
          <div className="flex justify-around py-4">
            {" "}
            <div className="text-center">
              <MyListbox
                selectedCurrency={selectedCurrency}
                onSelectCurrency={setSelectedCurrency}
              />
            </div>
            <div className="text-center">
              <MyListbox
                selectedCurrency={otherCurrency}
                onSelectCurrency={setOtherCurrency}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App

function MyListbox({ selectedCurrency, onSelectCurrency }) {
  return (
    <Listbox value={selectedCurrency} onChange={onSelectCurrency}>
      <Listbox.Button className="bg-slate-200">
        {selectedCurrency.name}
      </Listbox.Button>
      <Listbox.Options>
        {currencies.map((currency) => (
          <Listbox.Option key={currency.id} value={currency}>
            {currency.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
