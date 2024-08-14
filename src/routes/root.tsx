import { Data, Workout } from "@/types/data";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import WorkoutScreen from "@/components/WorkoutScreen";
import ExerciseList from "@/components/ExerciseList";

function Root() {
	const [stage, setStage] = useState<"composer" | "workout">("composer");

	const [data, setData] = useState<Data>(() => {
		const saved = localStorage.getItem("data");
		if (saved == null) {
			const newData: Data = new Data();
			const newWorkout: Workout = new Workout();
			newWorkout.name = "New workout";
			newData.workouts.push(newWorkout);

			return newData;
		}

		return JSON.parse(saved);
	});
	useEffect(() => {
		localStorage.setItem("data", JSON.stringify(data));
	}, [data]);

	const workoutDropdown = useRef<HTMLSelectElement>(null);

	const [currentWorkout, setCurrentWorkout] = useState<number>(0);
	useEffect(() => {
		if (workoutDropdown.current) {
			workoutDropdown.current.value = currentWorkout.toString();
		}
	}, [currentWorkout]);

	useEffect(() => {
		if (stage == "workout") {
			setTimeout(() => {
				document.querySelector("html")!.style.overflowY = "hidden";
				document.querySelector("html")!.style.scrollbarGutter = "auto";
			}, 300 - 100);
		} else if (stage == "composer") {
			setTimeout(() => {
				document.querySelector("html")!.style.overflowY = "visible";
				document.querySelector("html")!.style.scrollbarGutter = "stable";
			}, 100);
		}
	}, [stage]);

	function selectWorkout(e: ChangeEvent) {
		const target = e.target as HTMLSelectElement;
		setCurrentWorkout(Number(target.value));
	}

	function addWorkout() {
		const res = prompt("New workout name");
		if (res) {
			const copy = { ...data };

			const workout: Workout = new Workout();
			workout.name = res;
			copy.workouts.push(workout);

			setData({ ...copy });
			setCurrentWorkout(copy.workouts.length - 1);
		}
	}

	function renameWorkout() {
		const res = prompt("New workout name", data.workouts[currentWorkout].name);
		if (res) {
			const copy = { ...data };

			copy.workouts[currentWorkout].name = res;

			setData({ ...copy });
		}
	}

	function deleteWorkout() {
		if (data.workouts.length > 1) {
			const copy = { ...data };

			copy.workouts.splice(currentWorkout, 1);

			if (currentWorkout > 0) setCurrentWorkout(currentWorkout - 1);

			setData({ ...copy });
		} else {
			alert("You must have at least one workout!");
		}
	}

	function startWorkout() {
		// todo: validation
		setStage("workout");
	}

	function stopWorkout() {
		// todo: workout reset
		setStage("composer");
	}

	return (
		<>
			<div className="fixed -z-50 h-screen w-screen overflow-hidden bg-neutral-100">
				<div className="absolute -left-1/2 -top-1/2 h-[200vh] w-[200vw] overflow-hidden">
					<div
						className="h-full w-full animate-bgscrollup pt-5"
						style={{ backgroundImage: 'url("/dumbbell.svg")', backgroundRepeat: "repeat" }}
					/>
				</div>
				<div className="absolute -left-1/2 -top-1/2 h-[200vh] w-[200vw] overflow-hidden">
					<div
						className="h-full w-full animate-bgscrolldown pt-5"
						style={{ backgroundImage: 'url("/bicep.svg")', backgroundRepeat: "repeat" }}
					/>
				</div>
			</div>
			<Transition show={stage == "workout"}>
				<div className="fixed inset-0 z-50 bg-white transition-all duration-300 data-[closed]:translate-x-full">
					<WorkoutScreen data={data} onStopWorkout={stopWorkout} />
					{/* {isResting ? (
							<RestScreen
								workout={data.workouts[workoutIdx]}
								exercise={data.workouts[workoutIdx].exercises[exerciseIdx]!}
								currentSet={currentSet}
								onNext={next}
								onStopWorkout={stopWorkout}
							/>
						) : (
							<ExerciseScreen
								workout={data.workouts[workoutIdx]}
								exercise={data.workouts[workoutIdx].exercises[exerciseIdx]!}
								set={currentSet}
								last={currentSet == data.workouts[workoutIdx].exercises[exerciseIdx]!.sets && exerciseIdx == data.workouts[workoutIdx].exercises.length - 1}
								onNext={next}
								onStopWorkout={stopWorkout}
							/>
						)} */}
				</div>
			</Transition>
			<div className="mx-auto flex w-3/5 flex-col items-center bg-white px-24 pb-10 shadow-2xl">
				<div className="group my-20 w-full">
					<h1 className="text-5xl font-bold transition-[padding] group-hover:pl-2">WORKOUT COMPOSER</h1>
					<h2 className="text-xl font-semibold text-neutral-500">AUTOMATE YOUR EXERCISE</h2>
				</div>
				<div className="flex w-full flex-col gap-10">
					<div className="flex h-14 gap-0.5 pt-3">
						<div className="relative flex grow flex-col text-lg font-semibold">
							<span className="absolute -top-4 text-xs italic text-neutral-500">WORKOUT</span>
							<select onChange={selectWorkout} ref={workoutDropdown} className="input grow">
								{data.workouts.map((exercise, i) => (
									// todo: key
									<option key={i} value={i}>
										{exercise.name}
									</option>
								))}
							</select>
						</div>
						<button
							onClick={renameWorkout}
							className="flex aspect-square h-full items-center justify-center bg-neutral-200 text-neutral-500 transition-colors duration-75 hover:bg-sky-600 hover:text-white">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-pencil-line">
								<path d="M12 20h9" />
								<path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
								<path d="m15 5 3 3" />
							</svg>
						</button>
						<button
							onClick={deleteWorkout}
							className="flex aspect-square h-full items-center justify-center bg-neutral-200 text-neutral-500 transition-colors duration-75 hover:bg-red-600 hover:text-white">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-trash-2">
								<path d="M3 6h18" />
								<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
								<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
								<line x1="10" x2="10" y1="11" y2="17" />
								<line x1="14" x2="14" y1="11" y2="17" />
							</svg>
						</button>
						<button
							onClick={addWorkout}
							className="ml-5 flex aspect-square h-full items-center justify-center bg-neutral-200 text-neutral-500 transition-colors duration-75 hover:bg-sky-600 hover:text-white">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-plus">
								<path d="M5 12h14" />
								<path d="M12 5v14" />
							</svg>
						</button>
					</div>
					<ExerciseList
						workout={data.workouts[currentWorkout]}
						data={data}
						setData={setData}
						onStartWorkout={startWorkout}
					/>
				</div>
			</div>
		</>
	);
}

export default Root;
