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
