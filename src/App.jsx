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
      <main className="flex min-h-screen justify-between ">
        <div className="bg-red-500 w-1/2 text-center">
          <MyListbox
            selectedCurrency={selectedCurrency}
            onSelectCurrency={setSelectedCurrency}
          />
        </div>

        <div className="bg-blue-500 w-1/2 text-center">
          <MyListbox
            selectedCurrency={otherCurrency}
            onSelectCurrency={setOtherCurrency}
          />
        </div>
      </main>
    </>
  )
}

export default App

function MyListbox({ selectedCurrency, onSelectCurrency }) {
  return (
    <Listbox value={selectedCurrency} onChange={onSelectCurrency}>
      <Listbox.Button>{selectedCurrency.name}</Listbox.Button>
      <Listbox.Options>
        {currencies.map((currency) => (
          <Listbox.Option key={currency.id} value={currency}>
            {currency.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
      <p className="text-orange-500">{selectedCurrency.name}</p>
    </Listbox>
  )
}
