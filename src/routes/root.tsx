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
		<div className="mx-auto flex w-1/2 flex-col items-center">
			<h1 className="py-6">workout assistant</h1>
			<div className="flex w-full flex-col gap-6">
				<div className="flex gap-5 pt-6">
					<div className="relative flex grow flex-col">
						<span className="absolute -top-5 text-sm">workout</span>
						<input type="text" defaultValue="split 1 (dropdown)" className="grow" />
					</div>
					<button className="btn px-14">import</button>
					<button className="btn px-14">export</button>
					<div className="my-1 w-0.5 bg-neutral-300" />
					<button className="btn" />
				</div>
				<div className="mx-5 h-0.5 bg-neutral-300" />
				<div className="flex flex-col gap-5">
					<div className="flex gap-5 pt-3">
						<div className="relative flex grow flex-col">
							<span className="absolute -top-5 text-sm">workout name</span>
							<input type="text" defaultValue="split 1" className="grow" />
						</div>
						<div className="relative flex flex-col">
							<span className="absolute -top-5 text-sm">default exercise rest</span>
							<input type="number" defaultValue="30" className="w-40 grow" />
						</div>
						<div className="relative flex flex-col">
							<span className="absolute -top-5 text-sm">default set rest</span>
							<input type="number" defaultValue="15" className="w-40 grow" />
						</div>
						<div className="my-1 w-0.5 bg-neutral-300" />
						<button onClick={startWorkout} className="btn px-14">
							start workout
						</button>
					</div>
					<div className="flex flex-col items-center gap-1.5">{inputs}</div>
				</div>
			</div>
		</div>
	);
}

export default Root;
