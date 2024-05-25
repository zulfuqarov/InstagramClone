import React, { useEffect, useState, useContext } from 'react'
import SearchInput from '../components/SearchInput'
import Allusers from '../components/Allusers'
import { ContextInsta } from '../Context/Context'

const Search = () => {
    const context = useContext(ContextInsta)
   

    useEffect(() => {
        context.getAllUserProfile()
    }, [context.user])

    return (
        <div className='pt-[80px]'>
            <SearchInput />
            <Allusers />
        </div>
    )
}

export default Search