import { Data, Exercise, Workout } from "@/types/data";
import React from "react";
import ExerciseCard from "./ExerciseCard";

type Props = {
	workout: Workout;
	data: Data;
	setData: React.Dispatch<React.SetStateAction<Data>>;
	onStartWorkout: () => void;
};

// todo: dont take data and setData as props
const ExerciseList: React.FC<Props> = ({ workout, data, setData, onStartWorkout }: Props) => {
	function addExercise() {
		const copy = { ...data };

		workout.exercises.push(new Exercise());
		copy.workouts[copy.workouts.indexOf(workout)] = workout;

		setData({ ...copy });
	}

	function exerciseUpdated(
		i: number,
		name: string,
		sets: number,
		reps: number,
		restBetweenSets: number,
		restAfterExercise: number
	) {
		const copy = { ...data };

		copy.workouts[copy.workouts.indexOf(workout)].exercises[i] = Object.assign(
			copy.workouts[copy.workouts.indexOf(workout)].exercises[i],
			{ name, sets, reps, restBetweenSets, restAfterExercise }
		);

		setData({ ...copy });
	}

	function deleteExercise(i: number) {
		const copy = { ...data };

		copy.workouts[copy.workouts.indexOf(workout)].exercises.splice(i, 1);

		setData({ ...copy });
	}

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col items-center gap-1.5">
				<div className="mb-2 grid h-10 w-full grid-cols-9 gap-0.5 border-b-4 border-sky-600 font-semibold text-sky-600">
					<div className="col-span-5 flex items-center px-2">
						<h3>EXERCISE</h3>
					</div>
					<div className="flex items-center px-2">
						<h3>SETS</h3>
					</div>
					<div className="flex items-center px-2">
						<h3>REPS</h3>
					</div>
					<div className="col-span-2 flex items-center px-2">
						<h3>
							REST <span className="mt-0.5 text-xs">(BETWEEN SETS)</span>
						</h3>
					</div>
				</div>
				{workout?.exercises?.length > 0 ? (
					workout.exercises.map((exercise, i) => (
						<ExerciseCard
							key={exercise.key}
							i={i}
							exercise={exercise}
							last={i == workout.exercises.length - 1}
							onExerciseUpdated={exerciseUpdated}
							onDeleteExercise={deleteExercise}
						/>
					))
				) : (
					<span className="font-semibold text-neutral-500 italic">NO EXERCISES</span>
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
			<button onClick={onStartWorkout} className="group relative mx-auto h-14 w-1/3 duration-75">
				<div className="absolute left-0 top-0 z-10 h-full w-full">
					<div className="absolute left-0 top-0 h-full w-full bg-sky-600 transition-transform group-hover:-skew-x-6 group-hover:bg-sky-600" />
					<h1 className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold text-white transition-[font-size] group-hover:text-[2rem]">
						START WORKOUT
					</h1>
				</div>
				<div className="absolute left-1/2 top-1/2 h-[90%] w-full -translate-x-1/2 -translate-y-1/2 bg-sky-700 transition-[transform,width] group-hover:w-[105%] group-hover:-skew-x-6"></div>
			</button>
		</div>
	);
};

export default ExerciseList;
