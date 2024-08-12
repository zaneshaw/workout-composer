import ExerciseCard from "@/components/ExerciseCard";
import { Workout } from "@/types/workout";
import { useEffect, useState } from "react";
import { Transition, TransitionChild } from "@headlessui/react";

function Root() {
	const [doWorkout, setDoWorkout] = useState<boolean>(true);
	const [data, setData] = useState<Workout>(() => {
		const saved = localStorage.getItem("data") ?? '{"exercises": []}';
		return JSON.parse(saved);
	});
	useEffect(() => {
		console.log(data);
		localStorage.setItem("data", JSON.stringify(data));
	}, [data]);

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
		setDoWorkout(true);
	}

	function stopWorkout() {
		setDoWorkout(false);
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
		<>
			<Transition show={doWorkout}>
				<TransitionChild>
					<div className="fixed inset-0 z-40 bg-white transition duration-300 data-[closed]:opacity-0" />
				</TransitionChild>
				<TransitionChild>
					<div className="fixed inset-0 z-50 flex scale-100 flex-col items-center justify-center gap-20 transition-all duration-300 data-[closed]:scale-90 data-[closed]:opacity-0">
						<h2 className="text-5xl">exercise name</h2>
						<div className="relative flex items-end gap-5">
							<h1 className="mx-auto text-9xl">2</h1>
							<h1 className="absolute -right-32 bottom-2 w-max text-4xl text-neutral-400">/ 4 sets</h1>
						</div>
						<div className="flex flex-col gap-2">
							<button className="btn w-full">finish set (space)</button>
							<div className="flex gap-2">
								<button onClick={stopWorkout} className="btn">
									stop workout
								</button>
								<button className="btn">pause workout</button>
							</div>
						</div>
					</div>
				</TransitionChild>
			</Transition>
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
						<button onClick={addExercise} className="btn mx-auto">
							add exercise
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Root;
