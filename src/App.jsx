import { useState } from "react"
import { Listbox } from "@headlessui/react"

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
]
function App() {
  return (
    <>
      <main className="flex min-h-screen justify-between ">
        <div className="bg-red-500 w-1/2 text-center">
          <MyListbox />
        </div>

        <div className="bg-blue-500 w-1/2 text-center">
          <MyListbox />
        </div>
      </main>
    </>
  )
}

export default App

function MyListbox() {
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
      <Listbox.Button>{selectedPerson.name}</Listbox.Button>
      <Listbox.Options>
        {people.map((person) => (
          <Listbox.Option key={person.id} value={person}>
            {person.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
      <p className="text-orange-500">{selectedPerson.name}</p>
    </Listbox>
  )
}
