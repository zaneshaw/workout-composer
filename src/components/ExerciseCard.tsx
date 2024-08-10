import React from "react";
import { useState } from "react";

type Props = { i: number; last: boolean; onExerciseUpdated: (i: number, name: string, sets: number, rest?: number) => void };

const ExerciseCard: React.FC<Props> = ({ i, last, onExerciseUpdated }: Props) => {
	const [exerciseName, setExerciseName] = useState("");
	const [exerciseSets, setExerciseSets] = useState(1);

	const RestInput = () => {
		const [rest, setRest] = useState(30);
		if (last) return;

		return (
			<div className={`flex gap-1 text-sm ${rest == 30 ? "text-neutral-300" : "text-black"}`}>
				<input
					type="number"
					defaultValue="30"
					min="5"
					max="60"
					className="w-8 ring-0"
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
			<div className="flex w-full gap-5 rounded-lg ring-1 ring-black">
				<input
					type="text"
					defaultValue={`exercise name ${i + 1}`}
					onChange={(e) => {
						const name: string = e.target.value;
						setExerciseName(() => name);
						onExerciseUpdated(i, name, exerciseSets);
					}}
					className="grow py-3 ring-0"
				/>
				<div className="flex items-center gap-1">
					<input
						type="number"
						defaultValue={exerciseSets}
						onChange={(e) => {
							const sets: number = Number(e.target.value);
							setExerciseSets(() => sets);
							onExerciseUpdated(i, exerciseName, sets);
						}}
						className="w-6 py-3 ring-0"
					/>
					<span>sets</span>
				</div>
				<button type="button" className="btn bg-white ring-0">
					Delete
				</button>
			</div>
			<RestInput />
		</>
	);
};

export default ExerciseCard;
