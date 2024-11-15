import React, { useContext, useState } from 'react'
import { ContextInsta } from '../Context/Context'
import Search from '../page/Search'

const SearchInput = () => {
    const context = useContext(ContextInsta)
    const [searchInput, setsearchInput] = useState({
        Search: ''
    })
    const handleChangeInput = (e) => {
        setsearchInput({
            Search: e.target.value
        })
        context.profileSearch({
            Search: e.target.value
        })
    }

    return (
        <div className="max-w-md mx-auto">
            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <input value={searchInput.Search} onChange={handleChangeInput} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search " required />
                {/* <button onClick={() => context.profileSearch(searchInput)} type="submit" className="text-white absolute end-2.5 bottom-2.5  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bg-blue-500">Search</button> */}
            </div>
        </div>

    )
}

export default SearchInput