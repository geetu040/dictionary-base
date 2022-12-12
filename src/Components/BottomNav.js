import React, {useState} from 'react'
import { save_data } from '../firebase';

export const BottomNav = ({props}) => {

	const [sort_counter, set_sort_counter] = useState(0);

	const btnStyle = 'bg-dark text-light dark:bg-info dark:text-dark rounded px-3 text-sm py-1 mb-2 mx-2 font-semibold'

	const addWord = () => {
		window.scrollTo(0, 0);
		props.set_add_word_mode(true);
	}
	const selectAll = () => {
		let elems = document.querySelectorAll("input[type='checkbox']")
		for (let i = 0; i < elems.length; i++) {
			elems[i].checked = true;
		}
	}
	const unSelectAll = () => {
		let elems = document.querySelectorAll("input[type='checkbox']")
		for (let i = 0; i < elems.length; i++) {
			elems[i].checked = false;
		}
	}
	const deleteWord = () => {
		let elems = document.querySelectorAll("input[type='checkbox']")
		let new_vocab = [];
		for (let i = 0; i < elems.length; i++) {
			if (!elems[i].checked) {
				new_vocab.push(props.vocab[i])
			}
		}
		unSelectAll();
		props.set_vocab(new_vocab);
	}
	const editWord = ()=>{
		props.set_pop("edit")
	}
	const sort = () => {
		set_sort_counter((sort_counter + 1)%4)
		let schema;
		if (sort_counter <= 1) { schema = "word" }
		else if (sort_counter > 1) { schema = "time" }

		let new_vocab = [props.vocab[0]]
		for (let i = 1; i < props.vocab.length; i++) {
			for (let j in new_vocab) {
				if (props.vocab[i][schema] < new_vocab[j][schema]) {
					new_vocab = [].concat(new_vocab.slice(0, j), props.vocab[i], new_vocab.slice(j))
					break
				}
				if (parseInt(j) === new_vocab.length - 1) { new_vocab = new_vocab.concat(props.vocab[i]) }
			}
		}
		if (sort_counter === 1 || sort_counter === 2) { new_vocab = new_vocab.reverse() }
		props.set_vocab(new_vocab)
		unSelectAll()
	}

	const save = () => {
		save_data(props.vocab);
		props.send_pop("save_data", 2000);
	}

	return (
		<nav className='font-mono fixed flex flex-row flex-wrap bg-light-trans dark:bg-dark-trans bottom-0 justify-center pt-2' style={{ width: "inherit" }}>
			<button className={btnStyle} onClick={addWord}>Add Word</button>
			<button className={btnStyle} onClick={editWord}>Edit</button>
			<button className={btnStyle} onClick={selectAll}>Select All</button>
			<button className={btnStyle} onClick={unSelectAll}>Unselect All</button>
			<button className={btnStyle} onClick={deleteWord}>Delete</button>
			<button className={btnStyle} onClick={sort}>Sort</button>
			<button className={btnStyle} onClick={save}>Save</button>
		</nav>
	)
}
