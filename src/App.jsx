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
  const [amount, setAmount] = useState(1)
  const [exchangeRate, setExchangeRate] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const host = "api.frankfurter.app"
      const url = `https://${host}/latest?amount=1&from=${selectedCurrency.ISO}&to=${otherCurrency.ISO}`

      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const data = await response.json()
        const rate = data.rates[otherCurrency.ISO].toFixed(2)

        setExchangeRate(rate)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [selectedCurrency, otherCurrency, amount])

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-stone-500">
        <section className="flex flex-col bg-stone-800 md:w-1/2 md:px-0 mx-10 w-full p-2 rounded-lg border-[1px] border-orange-300 h-[25rem] relative">
          <h1 className="text-5xl font-light text-orange-300 tracking-wide text-center mb-3">
            Currency Converter
          </h1>
          <div className="flex justify-around gap-2 py-4 bg-red-500/20 z-30 h-[6rem] rounded-md sm:mx-10">
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
          {/* <div className="absolute bottom-40 left-1/2 -translate-x-1/2 z-0">
            <input
              type="number"
              placeholder={selectedCurrency.name}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p>{(amount * exchangeRate).toFixed(2) + otherCurrency.ISO}</p>
            <input
              value={
                amount === 1
                  ? otherCurrency.name
                  : (amount * exchangeRate).toFixed(2)
              }
              type="text"
            />
          </div> */}
          <div className="flex justify-around items-center gap-2 py-4 bg-red-500/20 z-0 h-[8rem] rounded-md sm:mx-10 mt-6">
            {" "}
            <div className="flex">
              <input
                type="number"
                placeholder={selectedCurrency.name}
                onChange={(e) => setAmount(e.target.value)}
                className="w-20"
              />
            </div>
            <p className="text-orange-300 font-light"> equals to</p>
            <p className="text-orange-300 font-light text-2xl">
              {`${(amount * exchangeRate).toFixed(2)} ${otherCurrency.ISO}`}
            </p>
          </div>

          <p className="absolute bottom-3 right-1/2 translate-x-1/2 text-orange-300 font-light w-full px-2">
            {selectedCurrency.name === otherCurrency.name
              ? `Exchange Rate: 1 ${selectedCurrency.name} equals 1
              ${otherCurrency.name}s`
              : `Exchange Rate: 1 ${selectedCurrency.name} equals ${exchangeRate} 
            ${otherCurrency.name}s`}
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
