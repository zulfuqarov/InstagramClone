import React from 'react'
import { Link } from 'react-router-dom'
const Category = () => {
    return (
        <div className='flex flex-col justify-evenly  h-[450px] border-r-[1px] border-gray-200 w-[187px] fixed'>

            <div className='w-[120px] mx-auto'>
                <img className='w-full' src="https://avatars.mds.yandex.net/i?id=58ac72e119b84b8a4614ca0a52448f70738eb418-10932914-images-thumbs&n=13" alt="" />
            </div>

            <div className='flex flex-col'>
                <Link className='text-[19px] px-[28px] py-[8px] my-[5px] transition-all w-[180px] hover:bg-gray-100 rounded-md mx-auto ' ><i className="pr-[20px] fa-solid fa-house "></i> Home</Link>
                <Link className='text-[19px] px-[28px] py-[8px] my-[5px] transition-all w-[180px] hover:bg-gray-100 rounded-md mx-auto ' ><i className="pr-[20px] fa-solid fa-user "></i> Profil</Link>
                <Link className='text-[19px] px-[28px] py-[8px] my-[5px] transition-all w-[180px] hover:bg-gray-100 rounded-md mx-auto ' ><i className="pr-[15px] fa-solid fa-comments "></i> Message</Link>
                <Link className='text-[19px] px-[28px] py-[8px] my-[5px] transition-all w-[180px] hover:bg-gray-100 rounded-md mx-auto ' ><i className="pr-[19px] fa-solid fa-gear "></i> Settings</Link>
                <Link className='text-[19px] px-[28px] py-[8px] my-[5px] transition-all w-[180px] hover:bg-gray-100 rounded-md mx-auto ' ><i className="pr-[18px] fa-solid fa-magnifying-glass "></i> Search</Link>
            </div>

        </div>
    )
}

export default Category