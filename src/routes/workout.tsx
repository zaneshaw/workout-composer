import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Workout() {
	const location = useLocation();
	console.log(location.state);

	return (
		<div className="mx-auto flex w-1/2 flex-col items-center">
			<div className="flex flex-col items-center py-6">
				<h1>workout page</h1>
				<Link to="/">return</Link>
			</div>
			<pre className="w-full p-5 ring-1 ring-black">{JSON.stringify(location.state, null, 4)}</pre>
		</div>
	);
}

export default Workout;
