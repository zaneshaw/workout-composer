import { Exercise, Workout } from "@/types/data";
import { useEffect, useState } from "react";

type Props = { workout: Workout; exercise: Exercise; currentSet: number; onNext: () => void; onStopWorkout: () => void };
const RestScreen: React.FC<Props> = ({ workout, exercise, currentSet, onNext, onStopWorkout }: Props) => {
	const [timeLeft, setTimeLeft] = useState(currentSet == exercise.sets ? (exercise.rest ?? workout.exerciseRest) : workout.setRest);
	useEffect(() => {
		const onKeydown = (e: KeyboardEvent) => {
			e.preventDefault();
			if (!e.repeat) {
				if (e.code == "Space") onNext();
				if (e.code == "Escape") onStopWorkout();
			}
		};
		const timer = setInterval(() => {
			setTimeLeft(timeLeft - 1);
			if (timeLeft - 1 == 0) {
				onNext();
				setTimeLeft(15);
			}
		}, 1000);

		window.addEventListener("keydown", onKeydown);
		document.body.style.overflowY = "hidden";

		return () => {
			window.removeEventListener("keydown", onKeydown);
			clearInterval(timer);

			document.body.style.overflowY = "";
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeLeft]);

	return (
		<>
			<div className="flex flex-col items-center gap-10">
				<div>
					<h2 className="text-8xl">{exercise.name}</h2>
					<h3 className="ml-1 text-xl font-semibold text-neutral-400">{workout.name}</h3>
				</div>
				<h2 className="text-5xl">{currentSet == exercise.sets ? "exercise rest time" : "set rest time"}</h2>
			</div>
			<div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-end gap-5">
				<h1 className="mx-auto text-[12rem] leading-none">{timeLeft}</h1>
				<h1 className="absolute -right-28 bottom-4 w-max text-3xl text-neutral-400">seconds</h1>
			</div>
			<div className="flex gap-1 text-2xl">
				<button onClick={onStopWorkout} className="flex aspect-square h-full grow items-center justify-center gap-3">
					<svg viewBox="0 0 24 24" fill="none" color="#737373" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				</button>
				<button onClick={onNext} className="flex w-full items-center justify-center gap-1.5 px-24 py-6">
					<span>skip rest</span>
					<span className="font-semibold text-neutral-500">(space)</span>
				</button>
			</div>
		</>
	);
};

export default RestScreen;
