import React from 'react'

export const Navbar = ({props}) => {

	return (<>

		<div className='fixed w-[100vw] px-9 py-2 flex items-center justify-between bg-dark-trans'>
			<div onClick={()=>{ if (props.vocab === props.vocab0) {props.set_vocab(props.vocab1)} else {props.set_vocab(props.vocab0)}} } className='border border-dark dark:border-info bg-light text-dark dark:bg-dark dark:text-info px-3 py-1 cursor-pointer font-semibold rounded-lg font-mono'>
				Home
			</div>
			<div className="w-[50px] h-[25px] cursor-pointer">
				<div onClick={() => { props.set_dark_mode(!props.dark_mode) }} className='w-[100%] h-[100%] bg-dark dark:bg-info rounded-full p-[4%]'>
					<div className='transition-transform hover:animate-pulse w-[50%] h-[100%] rounded-full bg-light dark:bg-dark dark:translate-x-[100%]'></div>
				</div>
			</div>
		</div>

	</>)
}
