import React, { useState } from 'react'

export const PopUp = ({ props }) => {

	const [n_keys, set_n_keys] = useState(null);
	const [n_labels, set_n_labels] = useState(null);

	let common_css = `
		fixed w-[80vw] left-[10vw] top-[10vh] z-10 max-h-[80vh] overflow-y-scroll
		shadow-xl rounded px-10 py-3 shadow-dark-trans text-center
		dark:text-info dark:bg-dark dark:border dark:border-info
	`
	//  ======== NULL ======== 
	if (props.pop === null) { return <></> }

	//  ======== ADD WORD ======== 
	if (props.pop === "add_word") {
		return (
			<div className={`
			${common_css}
			text-light bg-dark
			font-bold text-xl font-mono
			animate-bounce
		`}>
				<button onClick={() => { props.set_pop(null) }} className='absolute right-2 top-0 font-bold text-light dark:text-info opacity-60 hover:opacity-100'>X</button>
				Word Added Successfully !
			</div>
		)
	}

	if (props.pop === "edit") {


		let elems = document.querySelectorAll("input[type='checkbox']")
		let ind = null;
		for (let i = 0; i < elems.length; i++) {
			if (elems[i].checked) {
				ind = i;
				break;
			}
		}
		// ind = 3;
		let v;
		if (!ind) {
			//  ======== EDIT NOTHING SELECTED ======== 
			setTimeout(() => {
				props.set_pop(null);
			}, 2000);
		} else {
			//  ======== EDIT ======== 
			v = props.vocab[ind];
			if (n_keys === null) {
				set_n_keys(v.keys.length)
				set_n_labels(v.labels.length)
			}
		}


		function handleSave() {
			let elems = document.getElementsByClassName("save-data");
			let val;
			let vals = [];
			for (let i=0; i<elems.length; i++) {
				val = elems[i].value;
				if (val === "") {
					val = elems[i].placeholder;
				}
				if (val === "-") {
					val = null;
				}
				vals.push(val);
			}

			let new_word = {}
			new_word.word = vals[0];
			new_word.meaning = vals[1];
			new_word.time = (new Date()).getTime()
			new_word.keys = [];
			new_word.vals = [];

			let key;
			for (let i=2; i<elems.length; i+=2) {
				key = vals[i];
				val = vals[i+1];
				if (key && val) {
					new_word.keys.push(key);
					new_word.vals.push(val);
				}
			}

			new_word.labels = [];
			elems = document.getElementsByClassName("save-labels");
			for (let i=0; i<elems.length; i++) {
				val = elems[i].value;
				if (val === "") {
					val = elems[i].placeholder;
				}
				if (val !== "-") {
					new_word.labels.push(val);
				}
				
			}

			props.vocab[ind] = new_word;
			props.set_vocab([...props.vocab])
			props.set_pop(null);
			set_n_keys(null);
			set_n_labels(null);
		}


		return (
			<div className={`
			${common_css}
			text-dark bg-light border border-dark
			`}>

				<button onClick={() => { props.set_pop(null) }} className='absolute right-2 top-0 font-bold text-dark dark:text-info opacity-60 hover:opacity-100'>X</button>

				{(ind === null) && <>Select A Word to Edit</>}
				{(ind !== null) && <>
					<h1 className='mt-5 text-2xl font-bold'>Edit the Word</h1>

					<div className='my-5 flex flex-row flex-wrap justify-center items-center w-[80%] mx-auto'>
						<input className='save-data w-[40%] text-dark py-1 my-2 mx-1 text-center rounded border-[0.1px] border-dark dark:border-info' type="text" placeholder={v.word} />
						<input className='save-data w-[40%] text-dark py-1 my-2 mx-1 text-center rounded border-[0.1px] border-dark dark:border-info' type="text" placeholder={v.meaning} />
						{Array.from(Array(n_keys * 2).keys()).map((i) => {
							let place_holder;

							let index = Math.floor(i / 2)

							if (i % 2 === 0) {
								if (index < v.keys.length) {
									place_holder = v.keys[index]
								} else {
									// place_holder = `key ${ind + 1}`
									place_holder = "-"
								}
								return (
									<input className='save-data w-[40%] text-dark py-1 my-2 mx-1 text-center rounded border-[0.1px] border-dark dark:border-info' key={i} type="text" placeholder={place_holder} />
								)
							}
							if (i % 2 === 1) {
								if (index < v.keys.length) {
									place_holder = v.vals[index]
								} else {
									// place_holder = `val ${ind + 1}`
									place_holder = "-"
								}
								return (
									<input className='save-data w-[40%] text-dark py-1 my-2 mx-1 text-center rounded border-[0.1px] border-dark dark:border-info' key={i} type="text" placeholder={place_holder} />
								)
							}
							return <></>
						})}
					</div>
					<div className='flex flex-row space-x-1 mx-auto w-[55px]'>
						<button className='p-1 w-[100%] rounded-md bg-dark dark:bg-info text-light dark:text-dark font-semibold text-center' onClick={() => { if (n_keys !== 0) { set_n_keys(n_keys - 1) } }}>-</button>
						<button className='p-1 w-[100%] rounded-md bg-dark dark:bg-info text-light dark:text-dark font-semibold text-center' onClick={() => { if (n_keys !== 10) { set_n_keys(n_keys + 1) } }}>+</button>
					</div>

					<h1 className='mt-10 text-xl font-bold'>Labels</h1>
					<div className='w-[60%] my-5 flex flex-row flex-wrap justify-center items-center mx-auto'>
						{Array.from(Array(n_labels).keys()).map((i) => {
							let place_holder;
							if (i < v.labels.length) {
								place_holder = v.labels[i]
							} else {
								// place_holder = `Label ${i + 1}`
								place_holder = "-"
							}
							return (
								<input className='save-labels w-1/3 mx-2 text-dark py-1 my-2 text-center rounded border-[0.1px] border-dark dark:border-info' key={i} type="text" placeholder={place_holder} />
							)
						})}
					</div>
					<div className='flex flex-row space-x-1 mx-auto w-[55px]'>
						<button className='p-1 w-[100%] rounded-md bg-dark dark:bg-info text-light dark:text-dark font-semibold text-center' onClick={() => { if (n_labels !== 0) { set_n_labels(n_labels - 1) } }}>-</button>
						<button className='p-1 w-[100%] rounded-md bg-dark dark:bg-info text-light dark:text-dark font-semibold text-center' onClick={() => { if (n_labels !== 10) { set_n_labels(n_labels + 1) } }}>+</button>
					</div>


					<div className='my-10 mb-16 flex flex-row justify-center space-x-3'>
						<div
							onClick={() => props.set_pop(null)}
							className='py-1 w-fit cursor-pointer border border-light dark:border-info bg-dark text-light dark:bg-info dark:text-dark px-5 rounded'>
							Cancel
						</div>
						<div
							onClick={() => { handleSave() }}
							className='py-1 w-fit cursor-pointer border border-light dark:border-info bg-dark text-light dark:bg-info dark:text-dark px-5 rounded'>
							Save
						</div>
					</div>

				</>}
			</div>
		)
	}



}
