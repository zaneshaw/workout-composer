import { Exercise } from "@/types/workout";
import React from "react";
import { useState } from "react";

type Props = { exercise: Exercise; i: number; last: boolean; onExerciseUpdated: (i: number, name: string, sets: number, rest?: number) => void };

const ExerciseCard: React.FC<Props> = ({ exercise, i, last, onExerciseUpdated }: Props) => {
	const [exerciseName, setExerciseName] = useState(exercise.name);
	const [exerciseSets, setExerciseSets] = useState(exercise.sets);

	const RestInput = () => {
		const [rest, setRest] = useState(30);
		if (last) return;

		return (
			<div className={`flex gap-1 text-sm ${rest == 30 ? "text-neutral-300" : "text-black"}`}>
				<input
					type="number"
					defaultValue={exercise.rest ?? "30"}
					min="5"
					max="60"
					className="w-8 bg-transparent ring-0"
					onChange={(e) => {
						setRest(Number(e.target.value));
					}}
				/>
				<span>seconds</span>
			</div>
		);
	};

	return (
		<>
			<div className="flex w-full h-16 gap-0.5">
				<input
					type="text"
					defaultValue={exercise.name}
					onChange={(e) => {
						const name: string = e.target.value;
						setExerciseName(() => name);
						onExerciseUpdated(i, name, exerciseSets);
					}}
					className="input h-full grow flex"
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
						className="input w-24 h-full pr-0"
					/>
				</label>
				<button type="button" className="btn">
					delete
				</button>
			</div>
			<RestInput />
		</>
	);
};

export default ExerciseCard;
