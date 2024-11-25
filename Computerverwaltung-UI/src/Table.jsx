import { useEffect, useState } from "react"
import { computers } from "../utils/data"

export default function Table() {
    // const [computers, setComputers] = useState()
    const [selectedComputer, setSelectedComputer] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    // Fetch after mounting
    // useEffect(() => {
    //     const fetchDatas = async () => {
    //         const res = await fetch()
    //         setComputers(await res.json())
    //     } 
    //     fetchDatas()
    // })


    //Such Funktion
    const filteredComputers = computers?.filter(computer =>
        computer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Object.values(computer.details).some(value =>
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )

    return (
        <div className="max-w-[1200px] mx-auto p-4">
            <div className="bg-white border border-gray-300 shadow-md rounded-xl overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col">
                        <div className="p-4 border-b border-gray-200">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Suche..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
                            <table className="w-full">
                                <thead className="sticky top-0 bg-gray-50">
                                    <tr>
                                        <th className="text-lg font-bold text-left p-4">Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredComputers?.map((computer) => (
                                        <tr
                                            key={computer.id}
                                            className={`cursor-pointer hover:bg-blue-50 transition-colors duration-150 ${selectedComputer && selectedComputer.id === computer.id ? 'bg-blue-100' : ''
                                                }`}
                                            onClick={() => setSelectedComputer(computer)}
                                        >
                                            <td className="p-4 border-b border-gray-200">{computer.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredComputers?.length === 0 && (
                                <div className="p-4 text-center text-gray-500">
                                    Es wurden keine Computer gefunden, die Ihrer Suche entsprechen
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3 p-6 lg:p-8">
                        {selectedComputer ? (
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-gray-800">{selectedComputer?.name}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500 mb-1">Prozessor</p>
                                        <p className="font-medium">{selectedComputer?.details.processor}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500 mb-1">RAM</p>
                                        <p className="font-medium">{selectedComputer?.details.ram}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500 mb-1">Speicherplatz</p>
                                        <p className="font-medium">{selectedComputer?.details.storage}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500 mb-1">Grafikkarte</p>
                                        <p className="font-medium">{selectedComputer?.details.graphics}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                                        <p className="text-sm text-gray-500 mb-1">OS</p>
                                        <p className="font-medium">{selectedComputer?.details.os}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-xl text-gray-400">Select a computer to view its details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}