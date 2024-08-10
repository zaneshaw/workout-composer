import ExerciseCard from "@/components/ExerciseCard";
import { Workout } from "@/types/workout";
import { useNavigate } from "react-router-dom";

function Root() {
	const data: Workout = {
		exercises: [],
	};

	const navigate = useNavigate();

	function onExerciseUpdated(i: number, name: string, sets: number, rest?: number) {
		data.exercises[i] = { name, sets, rest };
	}

	function startWorkout() {
		// todo: better validation
		if (data.exercises.includes(undefined)) {
			return;
		}
		navigate("workout", { state: data });
	}

	const inputs = [];
	for (let i = 0; i < 4; i++) {
		inputs.push(<ExerciseCard key={i.toString()} i={i} last={i == 3} onExerciseUpdated={onExerciseUpdated} />);
	}

	return (
		<>
			<h1>main page</h1>
			<ul role="list" className="flex w-fit flex-col gap-1">
				{inputs}
			</ul>
			<button onClick={startWorkout}>start workout</button>
		</>
	);
}

export default Root;
