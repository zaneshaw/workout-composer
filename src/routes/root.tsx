import { Data, Exercise, Workout } from "@/types/data";
import { useEffect, useState } from "react";
import { Transition, TransitionChild } from "@headlessui/react";
import ExerciseCard from "@/components/ExerciseCard";
import ExerciseScreen from "@/components/ExerciseScreen";
import RestScreen from "@/components/RestScreen";
import WorkoutScreen from "@/components/WorkoutScreen";
import { v4 as uuidv4 } from "uuid";

function Root() {
	const [doWorkout, setDoWorkout] = useState<boolean>(false);
	const [data, setData] = useState<Data>(() => {
		const saved =
			localStorage.getItem("data") ??
			'{"workouts": [{"name": "new workout", "exerciseRest": 30, "setRest": 15, "exercises": []}, {"name": "another workout", "exerciseRest": 25, "setRest": 10, "exercises": []}]}';
		return JSON.parse(saved);
	});
	const [workoutIdx, setWorkoutIdx] = useState(0);
	const [exerciseIdx, setExerciseIdx] = useState(0);
	const [currentSet, setCurrentSet] = useState(1);
	const [isResting, setIsResting] = useState(false);
	useEffect(() => {
		if (doWorkout) {
			setTimeout(() => {
				document.body.style.overflowY = "hidden"
				document.body.style.scrollbarGutter = "auto";
			}, 300 - 100);
		} else {
			setTimeout(() => {
				document.body.style.overflowY = "visible"
				document.body.style.scrollbarGutter = "stable";
			}, 100);
		}
	}, [doWorkout]);
	useEffect(() => {
		localStorage.setItem("data", JSON.stringify(data));
	}, [data]);

	function onExerciseUpdated(i: number, name: string, sets: number, rest?: number) {
		const copy = { ...data };
		copy.workouts[workoutIdx].exercises[i] = { name, sets, rest, key: data.workouts[workoutIdx].exercises[i]!.key };

		setData({ ...copy });
	}

	function startWorkout() {
		// todo: better validation
		if (data.workouts[workoutIdx].exercises.includes(undefined)) {
			return;
		}
		setDoWorkout(true);
	}

	function stopWorkout() {
		setDoWorkout(false);

		// cursed: account for fade-out animation
		setTimeout(() => {
			setExerciseIdx(0);
			setCurrentSet(1);
			setIsResting(false);
		}, 300);
	}

	function addExercise() {
		const copy = { ...data };
		copy.workouts[workoutIdx].exercises.push({ name: "new exercise", sets: 1, key: uuidv4() });

		setData({ ...copy });
	}

	function deleteExercise(exercise: Exercise) {
		const copy = { ...data };
		copy.workouts[workoutIdx].exercises.splice(copy.workouts[workoutIdx].exercises.indexOf(exercise), 1);

		setData({ ...copy });
	}

	function next() {
		const workout: Workout = data.workouts[workoutIdx];
		const exercise: Exercise = workout.exercises[exerciseIdx]!;

		if (isResting) {
			if (currentSet < exercise.sets) {
				// next set
				setCurrentSet(currentSet + 1);
			} else {
				// finish exercise
				if (exerciseIdx < workout.exercises.length - 1) {
					// next exercise
					setExerciseIdx(exerciseIdx + 1);
					setCurrentSet(1);
				} else {
					// fix: never actually happens. re-structure if statment
					// finish workout
					stopWorkout();
					return;
				}
			}
		} else if (currentSet == exercise.sets && exerciseIdx == workout.exercises.length - 1) {
			// last set of last exercise
			// finish workout
			stopWorkout();
			return;
		}

		setIsResting(!isResting);
	}

	return (
		<>
			<div className="fixed -z-50 h-screen w-screen overflow-hidden bg-neutral-100">
				<div className="absolute -left-1/2 -top-1/2 h-[200vh] w-[200vw] overflow-hidden">
					<div
						className="animate-bgscrollup h-full w-full pt-5"
						style={{ backgroundImage: 'url("/dumbbell.svg")', backgroundRepeat: "repeat" }}
					/>
				</div>
				<div className="absolute -left-1/2 -top-1/2 h-[200vh] w-[200vw] overflow-hidden">
					<div
						className="animate-bgscrolldown h-full w-full pt-5"
						style={{ backgroundImage: 'url("/bicep.svg")', backgroundRepeat: "repeat" }}
					/>
				</div>
			</div>
			<Transition show={doWorkout}>
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
			<div className="mx-auto flex w-3/5 flex-col items-center bg-white px-24 pb-10">
				<div className="my-20 w-full">
					<h1 className="text-5xl font-bold">WORKOUT COMPOSER</h1>
					<h2 className="text-xl font-semibold text-neutral-500">AUTOMATE YOUR EXERCISE</h2>
				</div>
				<div className="flex w-full flex-col gap-10">
					<div className="flex h-14 gap-0.5 pt-3">
						<div className="relative flex grow flex-col text-lg font-semibold">
							<span className="absolute -top-4 text-xs italic text-neutral-500">WORKOUT</span>
							<select onChange={(e) => setWorkoutIdx(Number(e.target.value))} className="input grow">
								{data.workouts.map((exercise, i) => (
									// todo: key
									<option key={i} value={i}>
										{exercise.name}
									</option>
								))}
							</select>
						</div>
						<button className="flex aspect-square h-full items-center justify-center bg-neutral-200 text-neutral-500 hover:text-neutral-800">
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
						<button className="flex aspect-square h-full items-center justify-center bg-neutral-200 text-neutral-500 hover:text-neutral-800">
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
						<button className="ml-5 flex aspect-square h-full items-center justify-center bg-neutral-200 text-neutral-500 hover:text-neutral-800">
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
					<div className="flex flex-col gap-5">
						<div className="flex flex-col items-center gap-1.5">
							<div className="mb-2 grid h-10 w-full grid-cols-9 gap-0.5 bg-sky-600 font-semibold text-white">
								<div className="col-span-5 flex items-center border-r-2 border-white px-2">
									<h3>EXERCISE</h3>
								</div>
								<div className="flex items-center border-r-2 border-white px-2">
									<h3>SETS</h3>
								</div>
								<div className="flex items-center border-r-2 border-white px-2">
									<h3>REPS</h3>
								</div>
								<div className="col-span-2 flex items-center px-2">
									<h3>REST BETWEEN SETS</h3>
								</div>
							</div>
							{data.workouts[workoutIdx].exercises.length > 0 ? (
								data.workouts[workoutIdx].exercises.map((exercise, i) => (
									<ExerciseCard
										workout={data.workouts[workoutIdx]}
										exercise={exercise!}
										i={i}
										key={exercise!.key}
										last={i == data.workouts[workoutIdx].exercises.length - 1}
										onExerciseUpdated={onExerciseUpdated}
										deleteExercise={deleteExercise}
									/>
								))
							) : (
								<span>empty</span>
							)}
						</div>
						<button
							onClick={addExercise}
							className="mx-auto flex aspect-square w-10 items-center justify-center bg-neutral-200 text-neutral-500 transition-colors duration-75 hover:bg-sky-600 hover:text-white">
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
						<button onClick={startWorkout} className="group relative mx-auto h-14 w-1/3 transition-all">
							<div className="absolute left-0 top-0 h-full w-full bg-sky-600 duration-75 group-hover:-skew-x-12 group-hover:bg-sky-600" />
							<h1 className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold text-white">
								START WORKOUT
							</h1>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Root;
