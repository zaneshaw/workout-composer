import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Workout() {
	const location = useLocation();
	console.log(location.state);

	return (
		<>
			<Link to="/">return</Link>
			<h1>workout page</h1>
			<pre>{JSON.stringify(location.state, null, 4)}</pre>
		</>
	);
}

export default Workout;
