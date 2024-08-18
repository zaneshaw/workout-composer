import { ExerciseStep, generateSteps, Workout } from "@/types/data";
import accurateInterval from "accurate-interval";
import React, { useEffect, useState } from "react";
import Timer from "./Timer";

type Props = {
	workout: Workout;
	onStopWorkout: () => void;
};

const WorkoutScreen: React.FC<Props> = ({ workout, onStopWorkout }: Props) => {
	const [currentExercise, setCurrentExercise] = useState(0);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [prettyElapsedTime, setPrettyElapsedTime] = useState("0:00");
	const [listMargin, setListMargin] = useState(-1);
	const [nextCooldown, setNextCooldown] = useState(false);

	const steps = generateSteps(workout);

	// idk if i did this right...
	useEffect(() => {
		const interval = accurateInterval(
			() => {
				setElapsedTime(elapsedTime + 1);
			},
			1000,
			{ aligned: false, immediate: false }
		);

		setPrettyElapsedTime(`${Math.floor(elapsedTime / 60)}:${(elapsedTime % 60).toString().padStart(2, "0")}`);

		return () => {
			interval.clear();
		};
	}, [elapsedTime]);

	async function startCooldown(ms: number) {
		setNextCooldown(true);
		setTimeout(() => {
			setNextCooldown(false);
		}, ms);
	}

	function next() {
		if (nextCooldown) return;
		if (currentExercise >= steps.length - 1) {
			onStopWorkout();
			return;
		}

		startCooldown(500);

		const nextExercise = currentExercise + 1;
		const step = steps[currentExercise];
		const nextStep = steps[nextExercise];

		setCurrentExercise(nextExercise);

		/* todo: make this less weird or just find a different way to do the list */
		if ((step.kind == "rest" && step.isFinal) || (nextStep.kind == "rest" && nextStep.isFinal)) {
			setListMargin(listMargin - 5.002);
		} else {
			setListMargin(listMargin - 3.25);
		}
	}

	return (
		<div className="flex h-full w-full shrink-0 flex-col">
			{/* main content */}
			<div className="flex h-0 grow">
				{/* side bar */}
				<div className="relative w-1/4 shrink-0 break-all bg-neutral-50 shadow-r-md">
					<div className="flex justify-center border-b-2 border-neutral-300 py-10">
						<h1 className="font-bold italic">UP NEXT</h1>
					</div>
					<div className="relative mx-5 flex flex-col overflow-hidden text-lg font-semibold text-neutral-600">
						<div className="absolute left-0 top-[30px] animate-bounceright">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								stroke="none"
								className="lucide lucide-play h-4 w-4 fill-sky-600 stroke-sky-600">
								<polygon points="6 3 20 12 6 21 6 3" />
							</svg>
						</div>
						<div className="absolute right-0 top-[30px] animate-bounceleft">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								stroke="none"
								className="lucide lucide-play h-4 w-4 rotate-180 fill-sky-600 stroke-sky-600">
								<polygon points="6 3 20 12 6 21 6 3" />
							</svg>
						</div>
						<div
							style={{ marginTop: `${listMargin}rem` }}
							className="flex flex-col gap-6 py-10 transition-[margin]">
							{steps.map((exercise, i) =>
								exercise.kind == "exercise" ? (
									<div key={i} className="flex justify-between px-5">
										<span>{exercise.label}</span>
										<span>SET {exercise.set}</span>
									</div>
								) : exercise.isFinal ? (
									<div key={i} className="flex flex-col">
										<div className="mx-auto h-7 w-full border-t-2" />
										<div className="flex justify-between px-5 text-neutral-400">
											<span>REST</span>
											<span>{exercise.time}s</span>
										</div>
										<div className="mx-auto h-7 w-full border-b-2" />
									</div>
								) : (
									<div key={i} className="flex justify-between px-5 text-neutral-400">
										<span>REST</span>
										<span>{exercise.time}s</span>
									</div>
								)
							)}
						</div>
					</div>
					<div className="absolute bottom-0 left-0 h-1/4 w-full bg-gradient-to-t from-white" />
				</div>

				{/* action area (?) */}
				<div className="relative my-10 flex grow flex-col items-center break-all">
					<div className="flex w-full flex-col px-16">
						<h1 className="text-5xl font-bold">{steps[currentExercise].label}</h1>
						<h2 className="font-semibold text-neutral-500">{workout.name}</h2>
					</div>
					{steps[currentExercise].kind == "exercise" ? (
						<div className="relative flex w-full grow flex-col items-center justify-center gap-1">
							<h1 className="text-8xl font-semibold italic">SET {steps[currentExercise].set}</h1>
							<h2 className="text-3xl font-semibold text-neutral-500">
								{steps[currentExercise].reps} REPS
							</h2>
							<div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 *:h-[60vh] *:w-[60vw] *:stroke-neutral-100">
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
									className="lucide lucide-biceps-flexed animate-flex">
									<path d="M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1" />
									<path d="M15 14a5 5 0 0 0-7.584 2" />
									<path d="M9.964 6.825C8.019 7.977 9.5 13 8 15" />
								</svg>
							</div>
						</div>
					) : (
						<div className="relative flex w-full grow flex-col items-center justify-center gap-1">
							<h1 className="mb-16 text-8xl font-semibold italic">REST</h1>

							<h2 className="text-2xl font-semibold text-neutral-500">
								{steps[currentExercise].isFinal ? (
									<>
										<span className="italic">{steps[currentExercise + 1].label} </span>
										IN
									</>
								) : (
									<>SET {(steps[currentExercise + 1] as ExerciseStep).set} IN</>
								)}
							</h2>
							<h2 className="text-5xl font-semibold text-neutral-700">
								<span>
									<Timer
										key={currentExercise}
										initial={steps[currentExercise].time}
										onFinish={next}
									/>
								</span>
								<span> seconds</span>
							</h2>
							<div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 *:h-[60vh] *:w-[60vw] *:stroke-neutral-100">
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
									className="lucide lucide-hourglass animate-halfspin">
									<path d="M5 22h14" />
									<path d="M5 2h14" />
									<path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
									<path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
								</svg>
							</div>
						</div>
					)}

					{/* progress bar */}
					<div className="absolute -bottom-5 flex h-10 w-full flex-1 items-center">
						<div className="flex h-full w-full items-center px-10">
							<div className="flex h-1/3 w-full gap-0.5">
								<div className="flex grow bg-neutral-200">
									<div
										className="bg-sky-600 transition-[width]"
										style={{ width: (currentExercise / steps.length) * 100 + "%" }}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* bottom bar */}
			<div className="z-20 flex h-20 justify-between bg-neutral-50 font-semibold shadow-t-md">
				{/* placeholder */}
				<div className="flex h-full flex-1 items-center">
					<div className="flex h-full w-full items-center px-10">
						<span>WORKOUT COMPOSER</span>
					</div>
				</div>

				{/* center buttons */}
				<div className="flex h-full items-center">
					{/* stop button */}
					<button
						onClick={onStopWorkout}
						className="flex aspect-square h-full items-center justify-center hover:bg-neutral-200">
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
							className="lucide lucide-log-out">
							<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
							<polyline points="16 17 21 12 16 7" />
							<line x1="21" x2="9" y1="12" y2="12" />
						</svg>
					</button>

					{/* next button */}
					<button
						onClick={next}
						className="flex h-full w-80 flex-col items-center justify-center italic hover:bg-neutral-200">
						<span className="text-2xl font-bold leading-none">{steps[currentExercise].buttonLabel}</span>
						<span className="text-sm font-normal leading-none text-neutral-500">(space)</span>
					</button>

					{/* pause button */}
					<button className="flex aspect-square h-full items-center justify-center hover:bg-neutral-200">
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
							className="lucide lucide-circle-pause">
							<line x1="8" x2="8" y1="20" y2="4" />
							<line x1="16" x2="16" y1="20" y2="4" />
						</svg>
					</button>
				</div>

				{/* workout elapsed time */}
				<div className="flex h-full flex-1 items-center">
					<div className="flex h-full w-full items-center justify-end gap-2 px-10">
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
							className="lucide lucide-timer">
							<line x1="10" x2="14" y1="2" y2="2" />
							<line x1="12" x2="15" y1="14" y2="11" />
							<circle cx="12" cy="14" r="8" />
						</svg>
						<span className="min-w-8">{prettyElapsedTime}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WorkoutScreen;
