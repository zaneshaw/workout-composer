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



type ExerciseStep = {
	kind: "exercise",
	set: number,
	reps: number
};

type SetRestStep = {
	kind: "rest",
	time: number,
	isFinal: boolean
};

export type WorkoutStep = (ExerciseStep | SetRestStep) & { label: string };

// isnt a member of Workout class because of how data is parsed from local storage
export function generateSteps(workout: Workout): WorkoutStep[] {
	let steps: WorkoutStep[] = [];

	// [
	// 	{
	// 		label: "A",
	// 		kind: "exercise",
	// 		set: 1,
	// 		reps: 4
	// 	},
	// 	{
	// 		label: "A",
	// 		kind: "rest",
	// 		time: 15,
	// 		isFinal: false
	// 	},
	// 	{
	// 		label: "A",
	// 		kind: "exercise",
	// 		set: 2,
	// 		reps: 4
	// 	},
	// ]

	// steps.push({
	// 	label: exercise.name,
	// 	kind: "exercise",
	// 	set: i + 1,
	// 	reps: exercise.reps
	// })
	// steps.push({
	// 	label: exercise.name,
	// 	kind: "rest",
	// 	time: 10,
	// 	isFinal: false
	// })

	workout.exercises.forEach((exercise, i) => {
		for (let set = 1; set < exercise.sets + 1; set++) {
			steps.push({
				label: exercise.name,
				kind: "exercise",
				set,
				reps: exercise.reps
			})
			steps.push({
				label: exercise.name,
				kind: "rest",
				time: set == exercise.sets ? exercise.restAfterExercise: exercise.restBetweenSets,
				isFinal: set == exercise.sets
			})
		}
	});

	console.log(steps);
	return steps;
}
