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
			<Transition show={doWorkout}>
				<TransitionChild unmount>
					<div className="fixed inset-0 z-40 bg-white transition duration-300 data-[closed]:opacity-0" />
				</TransitionChild>
				<TransitionChild unmount>
					<div className="fixed inset-0 z-50 my-16 flex scale-100 flex-col items-center justify-between transition-all duration-300 data-[closed]:scale-95 data-[closed]:opacity-0">
						{isResting ? (
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
						)}
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
								<select onChange={(e) => setWorkoutIdx(Number(e.target.value))} className="input grow !bg-neutral-200">
									{data.workouts.map((exercise, i) => (
										// todo: key
										<option key={i} value={i}>
											{exercise.name}
										</option>
									))}
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
									<input
										type="text"
										key={workoutIdx}
										defaultValue={data.workouts[workoutIdx].name}
										onChange={(e) => {
											const copy = { ...data };
											copy.workouts[workoutIdx].name = e.target.value;

											setData({ ...copy });
										}}
										className="input grow"
									/>
								</div>
								<div className="relative flex flex-col">
									<span className="absolute -top-5 text-sm">default exercise rest</span>
									<input
										type="number"
										key={workoutIdx}
										defaultValue={data.workouts[workoutIdx].exerciseRest}
										onChange={(e) => {
											const copy = { ...data };
											copy.workouts[workoutIdx].exerciseRest = Number(e.target.value);

											setData({ ...copy });
										}}
										className="input w-40 grow"
									/>
								</div>
								<div className="relative flex flex-col">
									<span className="absolute -top-5 text-sm">default set rest</span>
									<input
										type="number"
										key={workoutIdx}
										defaultValue={data.workouts[workoutIdx].setRest}
										onChange={(e) => {
											const copy = { ...data };
											copy.workouts[workoutIdx].setRest = Number(e.target.value);

											setData({ ...copy });
										}}
										className="input w-40 grow"
									/>
								</div>
							</div>
							<button onClick={startWorkout} className="btn px-14">
								start workout
							</button>
						</div>
						<div className="flex flex-col items-center gap-1.5 p-2 ring-2 ring-inset ring-neutral-200">
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
