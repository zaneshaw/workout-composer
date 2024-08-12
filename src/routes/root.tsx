import ExerciseCard from "@/components/ExerciseCard";
import { Workout } from "@/types/workout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Root() {
	const [data, setData] = useState<Workout>(() => {
		const saved = localStorage.getItem("data") ?? '{"exercises": []}';
		return JSON.parse(saved);
	});
	useEffect(() => {
		console.log(data);
		localStorage.setItem("data", JSON.stringify(data));
	}, [data]);

	const navigate = useNavigate();

	function onExerciseUpdated(i: number, name: string, sets: number, rest?: number) {
		const copy = { ...data };
		copy.exercises[i] = { name, sets, rest };

		setData((_) => ({
			...copy,
		}));
	}

	function startWorkout() {
		// todo: better validation
		if (data.exercises.includes(undefined)) {
			return;
		}
		navigate("workout", { state: data });
	}

	function addExercise() {
		const copy = { ...data };
		copy.exercises.push({ name: "new exercise", sets: 1 });

		setData((_) => ({
			...copy,
		}));
	}

	const inputs = [];
	for (let i = 0; i < data.exercises.length; i++) {
		inputs.push(<ExerciseCard key={i.toString()} exercise={data.exercises[i]!} i={i} last={i == data.exercises.length - 1} onExerciseUpdated={onExerciseUpdated} />);
	}

	return (
		<div className="mx-auto flex w-1/2 flex-col items-center">
			<h1 className="py-6">workout assistant</h1>
			<div className="flex w-full flex-col gap-6">
				<div className="flex gap-3 pt-6">
					<div className="flex grow gap-0.5">
						<div className="relative flex grow flex-col">
							<span className="absolute -top-5 text-sm">workout</span>
							<select className="input grow !bg-neutral-200">
								<option>split 1</option>
								<option>split 2</option>
								<option>split 3</option>
							</select>
						</div>
						<button className="btn px-14">import</button>
						<button className="btn px-14">export</button>
					</div>
					<button className="btn" />
				</div>
				<div className="mx-5 h-0.5 bg-neutral-300" />
				<div className="flex flex-col gap-5">
					<div className="flex gap-3 pt-3">
						<div className="flex grow gap-0.5">
							<div className="relative flex grow flex-col">
								<span className="absolute -top-5 text-sm">workout name</span>
								<input type="text" defaultValue="split 1" className="input grow" />
							</div>
							<div className="relative flex flex-col">
								<span className="absolute -top-5 text-sm">default exercise rest</span>
								<input type="number" defaultValue="30" className="input w-40 grow" />
							</div>
							<div className="relative flex flex-col">
								<span className="absolute -top-5 text-sm">default set rest</span>
								<input type="number" defaultValue="15" className="input w-40 grow" />
							</div>
						</div>
						<button onClick={startWorkout} className="btn px-14">
							start workout
						</button>
					</div>
					<div className="flex flex-col items-center gap-1.5">{inputs}</div>
					<button onClick={addExercise} className="btn mx-auto">add exercise</button>
				</div>
			</div>
		</div>
	);
}

export default Root;
