import { useState, useEffect } from "react"
import { Listbox } from "@headlessui/react"

const currencies = [
  { id: 1, name: "Euro", ISO: "EUR" },
  { id: 2, name: "US Dollar", ISO: "USD" },
  { id: 3, name: "British Pound", ISO: "GBP" },
  { id: 4, name: "Japanese Yen", ISO: "JPY" },
  { id: 5, name: "Australian Dollar", ISO: "AUD" },
]
function App() {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
  const [otherCurrency, setOtherCurrency] = useState(currencies[1])
  useEffect(() => {
    const host = "api.frankfurter.app"
    fetch(
      `https://${host}/latest?amount=10&from=${selectedCurrency.ISO}&to=${otherCurrency.ISO}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        alert(
          `10 ${selectedCurrency.name} = ${data.rates.USD} USD\n1 ${
            selectedCurrency.name
          } = ${data.rates[otherCurrency.ISO]} ${otherCurrency.name}`
        )
        console.log(data)
      })
  }, [selectedCurrency, otherCurrency])

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-stone-500">
        <section className="flex flex-col bg-stone-800 md:w-1/2 md:px-0 mx-10 w-full p-2 rounded-lg border-[1px] border-orange-300 h-[25rem] relative">
          <h1 className="text-5xl font-light text-orange-300 tracking-wide text-center">
            Currency Converter
          </h1>
          <div className="flex justify-around gap-2 py-4 bg-red-500/20">
            {" "}
            <div className="flex flex-col items-center">
              <p className="text-orange-300 font-light">From</p>
              <MyListbox
                selectedCurrency={selectedCurrency}
                onSelectCurrency={setSelectedCurrency}
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-orange-300 font-light">To</p>
              <MyListbox
                selectedCurrency={otherCurrency}
                onSelectCurrency={setOtherCurrency}
              />
            </div>
          </div>
          <p className="absolute bottom-3 right-1/2 translate-x-1/2 text-orange-300 font-light w-full px-2">
            {" "}
            Exchange Rate: 1 {selectedCurrency.name} equals X{" "}
            {otherCurrency.name}s
          </p>
        </section>
      </main>
    </>
  )
}

export default App

function MyListbox({ selectedCurrency, onSelectCurrency }) {
  return (
    <Listbox value={selectedCurrency} onChange={onSelectCurrency}>
      <Listbox.Button className="bg-slate-200 w-[10rem] rounded-md font-light">
        {selectedCurrency.name}
      </Listbox.Button>
      <Listbox.Options className="bg-slate-200 mt-[1px] w-[10rem] rounded-md font-light">
        {currencies.map((currency) => (
          <Listbox.Option key={currency.id} value={currency}>
            {currency.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
