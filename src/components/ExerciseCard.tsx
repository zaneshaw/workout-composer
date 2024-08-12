import { Exercise, Workout } from "@/types/data";
import React from "react";
import { useState } from "react";

type Props = {
	workout: Workout;
	exercise: Exercise;
	i: number;
	last: boolean;
	onExerciseUpdated: (i: number, name: string, sets: number, rest?: number) => void;
	deleteExercise: (exercise: Exercise) => void;
};

const ExerciseCard: React.FC<Props> = ({ workout, exercise, i, last, onExerciseUpdated, deleteExercise }: Props) => {
	const [exerciseName, setExerciseName] = useState(exercise.name);
	const [exerciseSets, setExerciseSets] = useState(exercise.sets);
	const [rest, setRest] = useState(exercise.rest ?? workout.exerciseRest);

	const RestInput = () => {
		if (last) return;

		return (
			<div className={`flex gap-1 text-sm font-semibold ${exercise.rest == undefined ? "text-neutral-300" : "text-black"}`}>
				<input
					type="number"
					defaultValue={rest ?? workout.exerciseRest}
					min="5"
					max="60"
					className="w-8 bg-transparent ring-0"
					onChange={(e) => {
						// todo: update also when default exercise rest changes (workout.exerciseRest)
						const value: number = Number(e.target.value);
						const restTime: number | undefined = value == workout.exerciseRest ? undefined : value;

						setRest(restTime ?? workout.exerciseRest);
						onExerciseUpdated(i, exerciseName, exerciseSets, restTime);
					}}
				/>
				<span>seconds</span>
			</div>
		);
	};

	return (
		<>
			<div className="flex h-16 w-full gap-0.5">
				<input
					type="text"
					defaultValue={exercise.name}
					onChange={(e) => {
						const name: string = e.target.value;
						setExerciseName(() => name);
						onExerciseUpdated(i, name, exerciseSets);
					}}
					className="input flex h-full grow"
				/>
				<label className="relative cursor-text after:absolute after:right-5 after:top-1/2 after:origin-right after:-translate-y-1/2 after:content-['sets']">
					<input
						type="number"
						defaultValue={exercise.sets}
						min="1"
						max="99"
						onChange={(e) => {
							const sets: number = Number(e.target.value);
							setExerciseSets(() => sets);
							onExerciseUpdated(i, exerciseName, sets);
						}}
						onFocus={(e) => e.target.select()}
						className="input h-full w-24 pr-0"
					/>
				</label>
				<button type="button" onClick={() => deleteExercise(exercise)} className="btn">
					delete
				</button>
			</div>
			<RestInput />
		</>
	);
};

export default ExerciseCard;
