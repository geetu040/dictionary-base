import { Navbar } from "./Components/Navbar";
import { Base } from "./Components/Base";
import { PopUp } from "./Components/PopUp";


import { useState } from "react";
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

// import vocab1 from "./lexicons/lexicon1.json"
import { load_data } from './firebase';

function App() {

	const [dark_mode, set_dark_mode] = useState(false);
	const [pop, set_pop] = useState(null);			// add_word | edit | null
	const [vocab, set_vocab] = useState(null);	// vocab0 | vocab1

	const fetchPost = async () => {
		const new_data = await load_data();
		set_vocab(new_data);
	}
	if (!vocab) {
		fetchPost();
		return <>Loading ...</>
	}

	function send_pop(type, time) {
		set_pop(type);
		if (time === null) {return;} 
		setTimeout(() => {
			set_pop(null)
		}, time);
	}

	const props = {
		dark_mode, set_dark_mode,
		pop, set_pop, send_pop,
		vocab, set_vocab,
	}

	return (
		<BrowserRouter>
			<div className={(dark_mode ? "dark" : "")}>
				<Navbar props={props} />
				<PopUp props={props} />
				<div className='
						min-h-screen w-[100vw]
						py-16 mx-auto
						bg-light dark:bg-dark
					'>
					<div className="mx-auto w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[60vw]">
						<Routes>
							<Route path="/" element={<Base props={props} />} />
						</Routes>
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
}



export default App;



let vocab0 = [{
	"word": "word1",
	"meaning": "meaning1",
	"time": 1667878568.6029875,
	"labels": ["l1", "l4"],
	"keys": ["key911", "key426", "key300", "key316", "key132", "key521"],
	"vals": ["val911", "val426", "val300", "val316", "val132", "val521"]
}, {
	"word": "word2",
	"meaning": "meaning2",
	"time": 1667878568.6029875,
	"labels": ["l1", "l3"],
	"keys": ["key656", "key362", "key280"],
	"vals": ["val656", "val362", "val280"]
}, {
	"word": "word3",
	"meaning": "meaning3",
	"time": 1667878568.6029875,
	"labels": ["l1", "l2", "l4"],
	"keys": [],
	"vals": []
}, {
	"word": "word8",
	"meaning": "meaning8",
	"time": 1667878568.6029875,
	"labels": ["l4", "l3"],
	"keys": ["key912", "key850"],
	"vals": ["val912", "val850"]
}, {
	"word": "word7",
	"meaning": "meaning7",
	"time": 1667878568.6029875,
	"labels": ["l2"],
	"keys": [],
	"vals": []
}, {
	"word": "word4",
	"meaning": "meaning4",
	"time": 1667878568.6029875,
	"labels": ["l4", "l2"],
	"keys": ["key792", "key382"],
	"vals": ["val792", "val382"]
}, {
	"word": "word5",
	"meaning": "meaning5",
	"time": 1667878568.6029875,
	"labels": [],
	"keys": [],
	"vals": []
}, {
	"word": "word6",
	"meaning": "meaning6",
	"time": 1667878568.6029875,
	"labels": ["l3", "l4", "l2"],
	"keys": ["key466", "key280", "key429", "key751"],
	"vals": ["val466", "val280", "val429", "val751"]
}, {
	"word": "word9",
	"meaning": "meaning9",
	"time": 1667878568.6029875,
	"labels": ["l2"],
	"keys": ["key24", "key698", "key681", "key592", "key81", "key667"],
	"vals": ["val24", "val698", "val681", "val592", "val81", "val667"]
}, {
	"word": "word0",
	"meaning": "meaning0",
	"time": 1667878568.6029875,
	"labels": ["l2", "l1", "l4"],
	"keys": ["key717", "key689", "key478", "key724"],
	"vals": ["val717", "val689", "val478", "val724"]
}]