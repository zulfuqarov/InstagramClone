import React from 'react'

const ProfileHeader = () => {
    return (
        <section className='flex justify-between w-[700px] items-center pt-[50px]'>
            <div className='w-[150px] h-[150px] '>
                <img className='w-full h-full rounded-[50%]' src="https://2023.emnlp.org/assets/images/committee/sac/ParthaPratimTalukdar.jpg" alt="" />
            </div>
            <div className='flex flex-col'>
                <div className='flex justify-between w-[400px]'>
                    <p className='text-[19px] text-gray-700 '>Zulfuqarov.nebi</p>
                    <button className='text-[19px] text-gray-700 bg-gray-200 px-[10px] py-[2px] rounded-lg hover:bg-slate-100 hover:text-black transition-all'>Edit profile</button>
                    <button className='text-[19px] text-gray-700  hover:text-black transition-all'><i class="fa-solid fa-gear"></i></button>
                </div>
                <div className='flex justify-between w-[400px] pt-[30px]'>
                    <p className='text-[17px] text-gray-700 '><span className='text-black text-[19px] pr-[8px] font-bold'>15</span> Posts</p>
                    <p className='text-[17px] text-gray-700 '><span className='text-black text-[19px] pr-[8px] font-bold'>161</span> Followers</p>
                    <p className='text-[17px] text-gray-700 '><span className='text-black text-[19px] pr-[8px] font-bold'>177</span>Following</p>
                </div>
                <div className='pt-[30px]'>
                    <p className='text-[17px] text-gray-700 '>zulfuqarovv</p>
                </div>
            </div>
        </section>
    )
}

export default ProfileHeader