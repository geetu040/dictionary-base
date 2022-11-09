import React, { useState } from 'react'
import { BottomNav } from './BottomNav';
import { Add } from './Add';

export const Base = ({ props }) => {

	const [selected, set_selected] = useState(null);
	const [add_word_mode, set_add_word_mode] = useState(false);

	props = {
		...props,
		selected, set_selected,
		add_word_mode, set_add_word_mode,
	}

	return (<>

		<div className='text-center space-y-3 text-dark dark:text-info py-5 my-9 font-mono'>
			<h1 className='text-5xl font-bold'>Dictionary Base</h1>
			<p className=' text-md bg-dark dark:text-dark dark:bg-info text-light w-fit px-5 rounded mx-auto'>Create Your Own Personal Lexicon</p>
		</div>

		{(add_word_mode || props.vocab.length === 0) && <Add props={props} />}
		{props.vocab.length !== 0 && <>


			<table className="table-auto w-[100%] text-center bottom-0 left-0">
				<thead className='bg-dark text-light dark:bg-info dark:text-dark'>
					<tr>
						<th></th>
						<th>#</th>
						<th>Words</th>
						<th className='py-1'>Meanings</th>
					</tr>
				</thead>
				<tbody className='border border-light-trans dark:border-dark-trans shadow-2xl shadow-dark-trans'>
					{Array.from(Array(props.vocab.length * 3).keys()).map((i) => {

						let index = Math.floor(i / 3)
						let v = props.vocab[index];

						return <tr
							onClick={(event) => {
								if (event.target.className.includes("row-data")) {
									if (selected === index) { set_selected(null) } else { set_selected(index) }
								}
							}}
							className={`hover:bg-light-trans dark:hover:bg-dark-trans border-[0.5px] border-opacity-5 border-b-light-trans text-dark dark:border-b-info dark:border-opacity-5 dark:text-info `} key={i}>
							{(i % 3 === 0) && <>
								<th><input className={`w-[9px] h-[9px] mx-auto r${index}`} type="checkbox" name="" id="" /></th>
								<th className='row-data'>{Math.floor(i / 3) + 1}</th>
								<td className='row-data'>{v.word}</td>
								<td className='py-1 row-data'>{v.meaning}</td>
							</>}
							{(i % 3 === 1) && <td hidden={selected !== index} colSpan={4}>
								<table className='bg-light-trans dark:bg-dark-trans text-sm mx-auto w-[60%] my-3'><tbody className=''>
									{Array.from(Array(v.keys.length).keys()).map((l) => {
										return (<tr key={l}>
											<td className='border-[0.1px] border-dark-trans dark:border-info dark:border-opacity-20 font-semibold'>{v.keys[l]}</td>
											<td className='border-[0.1px] border-dark-trans dark:border-info dark:border-opacity-20'>{v.vals[l]}</td>
										</tr>)
									})}
								</tbody></table>
							</td>}
							{(i % 3 === 2) && <td hidden={selected !== index} colSpan={4}>
								{v.labels.map((label, j) => {
									let connected = (props.vocab.filter((vo) => {
										if (vo.word === v.word) return false;
										return (vo.labels.includes(label))
									}))
									connected = connected.map((con) => {
										return [con.word, con.meaning];
									})
									return (
										<div key={j}>
											<h1 className='text-lg font-semibold'>Words in Same Label - {label}</h1>
											<table className='bg-light-trans dark:bg-dark-trans text-sm mx-auto w-[60%] my-3'><tbody className=''>
												{connected.map((con, k) => {
													return (<tr key={k}>
														<td className='border-[0.1px] border-dark-trans dark:border-info dark:border-opacity-20 font-semibold'>{con[0]}</td>
														<td className='border-[0.1px] border-dark-trans dark:border-info dark:border-opacity-20'>{con[1]}</td>
													</tr>)
												})}
											</tbody></table>
										</div>
									)
								})}
							</td>}
						</tr>

					})}
				</tbody>
			</table>
			<BottomNav props={props} />

		</>}
	</>)
}


