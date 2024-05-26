import React from 'react'

const RightMessage = ({ handleChangeMessage, SendMessage, message }) => {
    return (
        <div className="flex flex-col h-full w-full bg-white px-4 py-6">
            <div className="h-full overflow-hidden py-4">
                <div className="h-full overflow-y-auto">
                    <div className="grid grid-cols-12 gap-y-2">
                        {
                            message && message.map((oneMap, index) => (
                                <div key={index} className="col-start-6 col-end-13 p-3 rounded-lg">
                                    <div className="flex items-center justify-start flex-row-reverse">
                                        <div
                                            className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                        >
                                            A
                                        </div>
                                        <div
                                            className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                        >
                                            <div>
                                                {oneMap}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center">
                <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
                    <div className="w-full">
                        <input type="text"
                            onChange={handleChangeMessage}
                            className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center" placeholder="Type your message...." />
                    </div>
                </div>
                <div className="ml-6">
                    <button onClick={SendMessage} className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 ">
                        <svg className="w-5 h-5 transform rotate-90 -mr-px"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RightMessage