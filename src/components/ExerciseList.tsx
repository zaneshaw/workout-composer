import { Data, Exercise, Workout } from "@/types/data";
import React from "react";
import ExerciseCard from "./ExerciseCard";

type Props = {
	workout: Workout;
	data: Data;
	setData: React.Dispatch<React.SetStateAction<Data>>;
};

// todo: dont take data and setData as props
const ExerciseList: React.FC<Props> = ({ workout, data, setData }: Props) => {
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
					<span className="font-semibold italic text-neutral-500">NO EXERCISES</span>
				)}
			</div>
			<button onClick={addExercise} className="btn mx-auto flex aspect-square w-10 items-center justify-center">
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
	);
};

export default ExerciseList;
