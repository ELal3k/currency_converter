import { useState, useEffect } from "react"
import { Listbox } from "@headlessui/react"
import { SunIcon } from "@heroicons/react/24/solid"
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
        const rate = data.rates[otherCurrency.ISO]?.toFixed(2)

        setExchangeRate(rate)
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchData()
  }, [selectedCurrency, otherCurrency, amount])

  return (
    <>
      <main className="flex min-h-screen items-center justify-center theme-everglade theme-dark bg-primaryBg text-primary">
        <div className="absolute top-5 right-5 h-8 w-8 ">
          <SunIcon />
        </div>
        <section className="flex flex-col md:w-1/2 md:px-0 mx-10 w-full p-2 rounded-lg border-[2px] border-primary sm:h-[25rem] h-[30rem] relative bg-neutralBg">
          <h1 className="text-5xl font-light tracking-wide text-center mb-3">
            Currency Converter
          </h1>

          <div className="flex justify-around gap-2 py-4 z-30 h-[6rem] rounded-md sm:mx-10">
            {" "}
            <div className="flex flex-col items-center">
              <p className="font-light">From</p>
              <MyListbox
                selectedCurrency={selectedCurrency}
                onSelectCurrency={setSelectedCurrency}
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-light">To</p>
              <MyListbox
                selectedCurrency={otherCurrency}
                onSelectCurrency={setOtherCurrency}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 py-4 z-0 h-[8rem] rounded-md sm:mx-10 mt-6">
            {" "}
            <div className="flex">
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  const newValue = e.target.value < 0 ? 0 : e.target.value
                  setAmount(newValue)
                }}
                className="w-20 rounded-md px-2 text-lg"
              />
            </div>
            <p className="font-light"> {selectedCurrency.ISO} equals to</p>
            <p className=" font-light text-3xl">
              {selectedCurrency.name === otherCurrency.name
                ? `${amount.toFixed(2)} ${otherCurrency.ISO}`
                : `${(amount * exchangeRate).toFixed(2)} ${otherCurrency.name}`}
            </p>
          </div>

          <p className="absolute bottom-3 right-1/2 translate-x-1/2  font-light w-full px-2">
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
      <Listbox.Button className="w-[10rem] rounded-md font-light">
        {selectedCurrency.name}
      </Listbox.Button>
      <Listbox.Options className="mt-[1px] w-[10rem] rounded-md font-light">
        {currencies.map((currency) => (
          <Listbox.Option key={currency.id} value={currency}>
            {currency.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
