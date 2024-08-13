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
			<div className={`flex gap-1 text-sm font-semibold ${exercise.rest == undefined && "text-neutral-300"}`}>
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
			<div className="group relative grid h-16 w-full grid-cols-9 gap-0.5 border-y-2 border-neutral-200 text-lg font-semibold">
				<label className="col-span-5 flex h-full items-center">
					<input
						type="text"
						defaultValue={exercise.name}
						placeholder="EXERCISE NAME"
						onChange={(e) => {
							const name: string = e.target.value;
							setExerciseName(() => name);
							onExerciseUpdated(i, name, exerciseSets);
						}}
						className="h-2/3 w-full border-r-2 border-neutral-200 px-2 outline-none placeholder:text-neutral-300"
					/>
				</label>
				<label className="flex h-full items-center">
					<input
						type="number"
						defaultValue={exercise.sets}
						min="1"
						max="99"
						placeholder="1 - 99"
						onChange={(e) => {
							const sets: number = Number(e.target.value);
							setExerciseSets(() => sets);
							onExerciseUpdated(i, exerciseName, sets);
						}}
						className="h-2/3 w-full border-r-2 border-neutral-200 px-2 outline-none placeholder:text-neutral-300"
					/>
				</label>
				<label className="flex h-full items-center">
					<input
						type="number"
						min="1"
						max="99"
						placeholder="1 - 99"
						onChange={(e) => {
							const sets: number = Number(e.target.value);
							setExerciseSets(() => sets);
							onExerciseUpdated(i, exerciseName, sets);
						}}
						className="h-2/3 w-full border-r-2 border-neutral-200 px-2 outline-none placeholder:text-neutral-300"
					/>
				</label>
				<label className="col-span-2 flex h-full items-center">
					<input
						type="number"
						min="5"
						max="60"
						placeholder="5 - 60"
						onChange={(e) => {
							const sets: number = Number(e.target.value);
							setExerciseSets(() => sets);
							onExerciseUpdated(i, exerciseName, sets);
						}}
						className="h-2/3 w-full px-2 outline-none placeholder:text-neutral-300"
					/>
				</label>
				<div className="absolute right-0 top-0 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full">
					<button
						type="button"
						onClick={() => deleteExercise(exercise)}
						className="rounded-full bg-neutral-200 p-1 text-neutral-500 opacity-0 outline-none transition-all duration-75 hover:bg-red-600 hover:text-white group-hover:opacity-100">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="3"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-trash-2 h-4 w-4">
							<path d="M3 6h18" />
							<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
							<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
							<line x1="10" x2="10" y1="11" y2="17" />
							<line x1="14" x2="14" y1="11" y2="17" />
						</svg>
					</button>
				</div>
			</div>
			<RestInput />
		</>
	);
};

export default ExerciseCard;
