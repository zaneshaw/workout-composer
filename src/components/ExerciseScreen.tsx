import { Exercise, Workout } from "@/types/data";
import { useEffect } from "react";

type Props = { workout: Workout; exercise: Exercise; set: number; last: boolean; onNext: () => void; onStopWorkout: () => void };
const ExerciseScreen: React.FC<Props> = ({ workout, exercise, set, last, onNext, onStopWorkout }: Props) => {
	useEffect(() => {
		const onKeydown = (e: KeyboardEvent) => {
			e.preventDefault();
			if (!e.repeat) {
				if (e.code == "Space") onNext();
				if (e.code == "Escape") onStopWorkout();
			}
		};

		window.addEventListener("keydown", onKeydown);
		document.body.style.overflowY = "hidden";

		return () => {
			window.removeEventListener("keydown", onKeydown);
			document.body.style.overflowY = "";
		};
	}, [onNext, onStopWorkout]);

	return (
		<>
			<div>
				<h2 className="text-8xl">{exercise.name}</h2>
				<h3 className="ml-1 text-xl font-semibold text-neutral-400">{workout.name}</h3>
			</div>
			<div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-end gap-5">
				<h1 className="mx-auto text-[12rem] leading-none">{set}</h1>
				<h1 className="absolute -right-24 bottom-4 w-max text-3xl text-neutral-400">/ {exercise.sets} sets</h1>
			</div>
			<div className="flex gap-1 text-2xl">
				<button onClick={onStopWorkout} className="flex aspect-square h-full grow items-center justify-center gap-3">
					<svg viewBox="0 0 24 24" fill="none" color="#737373" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				</button>
				<button onClick={onNext} className="flex w-full items-center justify-center gap-1.5 px-24 py-6">
					<span>finish</span>
					{/* {set == exercise.sets ? <span className="italic">{exercise.name}</span> : <span>set {set}</span>} */}
					{last ? <span>workout</span> : set == exercise.sets ? <span>exercise</span> : <span>set</span>}
					<span className="font-semibold text-neutral-500">(space)</span>
				</button>
			</div>
		</>
	);
};

export default ExerciseScreen;
