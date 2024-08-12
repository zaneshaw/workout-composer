export interface Data {
	workouts: Workout[];
}

export interface Workout {
	name: string;
	exerciseRest: number;
	setRest: number;
	exercises: (Exercise | undefined)[];
}

export interface Exercise {
	key: string;
	name: string;
	sets: number;
	rest?: number;
}
