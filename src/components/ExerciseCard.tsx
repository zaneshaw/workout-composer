import React from "react";
import { useState } from "react";

type Props = { i: number; last: boolean; onExerciseUpdated: (i: number, name: string, sets: number, rest?: number) => void };

const ExerciseCard: React.FC<Props> = ({ i, last, onExerciseUpdated }: Props) => {
	const [exerciseName, setExerciseName] = useState("");
	const [exerciseSets, setExerciseSets] = useState(1);

	const RestInput = () => {
		if (last) return;
		return (
			<div className="flex gap-1">
				<input type="number" defaultValue="30" min="5" max="60" className="w-8" />
				<span>seconds</span>
			</div>
		);
	};

	return (
		<li className="flex flex-col items-center gap-1">
			<div className="flex gap-1 bg-red-500 p-1">
				<input
					type="text"
					onChange={(e) => {
						const name: string = e.target.value;
						setExerciseName(() => name);
						onExerciseUpdated(i, name, exerciseSets);
					}}
				/>
				<input
					type="number"
					defaultValue={exerciseSets}
					onChange={(e) => {
						const sets: number = Number(e.target.value);
						setExerciseSets(() => sets);
						onExerciseUpdated(i, exerciseName, sets);
					}}
				/>
				<button type="button" className="bg-white">
					Delete
				</button>
			</div>
			<RestInput />
		</li>
	);
};

export default ExerciseCard;
