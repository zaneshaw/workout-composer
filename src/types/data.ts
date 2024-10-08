import { v4 as uuidv4 } from "uuid";

export class Data {
	workouts: Workout[] = [];
}

export class Workout {
	readonly key: string = uuidv4();

	name: string = "";
	exercises: Exercise[] = [];
}

export class Exercise {
	readonly key: string = uuidv4();

	name: string = "";
	sets: number = 4;
	reps: number = 8;
	restBetweenSets: number = 15;
	restAfterExercise: number = 30;
}

export type ExerciseStep = {
	kind: "exercise";
	set: number;
	reps: number;
};

type SetRestStep = {
	kind: "rest";
	time: number;
	isFinal: boolean;
};

export type WorkoutStep = (ExerciseStep | SetRestStep) & { label: string; buttonLabel: string };

// isnt a member of Workout class because of how data is parsed from local storage
export function generateSteps(workout: Workout): WorkoutStep[] {
	const steps: WorkoutStep[] = [];

	workout.exercises.forEach((exercise, i) => {
		for (let set = 1; set < exercise.sets + 1; set++) {
			steps.push({
				label: exercise.name,
				buttonLabel: set == exercise.sets && i == workout.exercises.length - 1 ? "FINISH WORKOUT" : "FINSIH SET",
				kind: "exercise",
				set,
				reps: exercise.reps,
			});
			if (set != exercise.sets || i != workout.exercises.length - 1) {
				steps.push({
					label: set == exercise.sets ? "INTERMISSION" : exercise.name,
					buttonLabel: "SKIP REST",
					kind: "rest",
					time: set == exercise.sets ? exercise.restAfterExercise : exercise.restBetweenSets,
					isFinal: set == exercise.sets,
				});
			}
		}
	});

	return steps;
}
