import React, { useState } from 'react'

export const Add = ({props}) => {

	const [n_keys, set_n_keys] = useState(1);

	function handleAdd() {
		let ans = document.getElementsByClassName("ans")
		let val;
		let vals = [];
		for (let i=0; i<ans.length; i++) {
			val = ans[i].value
			if (val.replace(/\s/g, '') === "") {
				return;
			}
			vals.push(val)
		}
	
		let vals_map = {
			word: vals[0],
			meaning: vals[1],
			time: (new Date).getTime(),
			labels: [],
			keys: [],
			vals: [],
		}
		for (let i=2; i<vals.length; i++) {
			if (i%2 == 0) {
				vals_map.keys.push(vals[i]);
			} else {
				vals_map.vals.push(vals[i])
			}
		}

		let new_vocab = props.vocab.concat(vals_map)
		props.set_vocab(new_vocab);

		for (let i=0; i<ans.length; i++) {
			val = ans[i].value = ""
		}

		props.send_pop("add_word", 2000)


	}

	return (
		<div className='
			py-10 my-5 font-mono
			text-center rounded-lg border
			text-dark border-dark bg-light-trans
			dark:text-info dark:border-info dark:bg-dark-trans
		'>
			<h1 className='text-3xl pb-8 font-bold font-sans'>Add Word</h1>

			<div className='w-[80%] space-y-3 mx-auto pb-5'>
				<div className='w-[100%] items-center flex flex-col space-y-2 md:flex-row md:space-y-0'>
					<label className='font-semibold w-[100%]' htmlFor="word">Word</label>
					<input className='ans text-dark text-center rounded border border-dark dark:border-info w-[100%]' type="text" id="word" />
				</div>
				<div className='w-[100%] items-center flex flex-col space-y-2 md:flex-row md:space-y-0'>
					<label className='font-semibold w-[100%]' htmlFor="meaning">Meaning</label>
					<input className='ans text-dark text-center rounded border border-dark dark:border-info w-[100%]' type="text" id="meaning" />
				</div>
				<br />
				{Array.from(Array(n_keys).keys()).map((n)=>{
					return (
						<div key={n} className='w-[100%] space-x-2 flex flex-row'>
							<input className='ans text-dark rounded border border-dark dark:border-info w-[100%] text-center' type="text" placeholder={`Key ${n+1}`} />
							<input className='ans text-dark rounded border border-dark dark:border-info w-[100%] text-center' type="text" placeholder={`Value ${n+1}`} />
						</div>
					)
				})}
				<div className='flex flex-row space-x-1 mx-auto w-[55px]'>
					<button className='p-1 w-[100%] rounded-md bg-dark dark:bg-info text-light dark:text-dark font-semibold text-center' onClick={()=>{if (n_keys !== 0) {set_n_keys(n_keys-1)}}}>-</button>
					<button className='p-1 w-[100%] rounded-md bg-dark dark:bg-info text-light dark:text-dark font-semibold text-center' onClick={()=>{if (n_keys !== 10) {set_n_keys(n_keys+1)}}}>+</button>
				</div>
			</div>

			<div className='flex flex-row justify-center space-x-3'>
				<div
					onClick={()=>props.set_add_word_mode(false)}
					className='py-1 w-fit cursor-pointer border border-light dark:border-info bg-dark text-light dark:bg-info dark:text-dark px-5 rounded'>
					Cancel
				</div>
				<div
					onClick={()=>{handleAdd()}}
					className='py-1 w-fit cursor-pointer border border-light dark:border-info bg-dark text-light dark:bg-info dark:text-dark px-5 rounded'>
					Done
				</div>
			</div>


		</div>
	)
}
