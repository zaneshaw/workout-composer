export interface Workout {
	// exercise_rest: number;
	// set_rest: number;
	exercises: (Exercise | undefined)[];
}

export interface Exercise {
	name: string;
	sets: number;
	rest?: number;
}
