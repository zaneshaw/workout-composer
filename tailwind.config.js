/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
	theme: {
		extend: {
			animation: {
				halfspin: "halfspin 3s cubic-bezier(0.88, -0.3, 0.12, 1.3) infinite",
				flex: "flex 3s ease-in-out infinite",
				bounceleft: "bounceleft 0.5s infinite",
				bounceright: "bounceright 0.5s infinite",
				bgscrolldown: "bgscrolldown 10s linear infinite",
				bgscrollup: "bgscrollup 10s linear infinite",
			},
			keyframes: {
				halfspin: {
					"0%, 30%": { transform: "rotate(0deg)" },
					"60%, 100%": { transform: "rotate(180deg)" },
				},
				flex: {
					"0%, 45%, 80%, 100%": { transform: "scaleY(1)" },
					"50%": { transform: "scale(1.05, 0.9)" },
					"70%": { transform: "scale(1.07, 0.88)" },
					"75%": { transform: "scale(0.97, 1.03)" },
				},
				bounceleft: {
					"0%, 100%": {
						transform: "translateX(25%)",
						animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
					},
					"50%": {
						transform: "translateX(0)",
						animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
					},
				},
				bounceright: {
					"0%, 100%": {
						transform: "translateX(-25%)",
						animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
					},
					"50%": {
						transform: "translateX(0)",
						animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
					},
				},
				bgscrolldown: {
					"0%": {
						transform: "translate(300px, -300px)",
					},
					"100%": {
						transform: "translate(0, 0)",
					},
				},
				bgscrollup: {
					"0%": {
						transform: "translate(-300px, 300px)",
					},
					"100%": {
						transform: "translate(0, 0)",
					},
				},
			},
			boxShadow: {
				"t-sm": "0 -1px 2px 0 rgba(0, 0, 0, 0.05)",
				"t-md": "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
				"t-lg": "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
				"t-xl": "0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
				"t-2xl": "0 -25px 50px -12px rgba(0, 0, 0, 0.25)",
				"t-3xl": "0 -35px 60px -15px rgba(0, 0, 0, 0.3)",
				"b-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
				"b-md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
				"b-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)",
				"b-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 -10px 10px -5px rgba(0, 0, 0, 0.04)",
				"b-2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
				"b-3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
				"l-sm": "-1px 0 2px 0 rgba(0, 0, 0, 0.05)",
				"l-md": "-4px 0 6px -1px rgba(0, 0, 0, 0.1), 2px 0 4px -1px rgba(0, 0, 0, 0.06)",
				"l-lg": "-10px 0 15px -3px rgba(0, 0, 0, 0.1), 4px 0 6px -2px rgba(0, 0, 0, 0.05)",
				"l-xl": "-20px 0 25px -5px rgba(0, 0, 0, 0.1), 10px 0 10px -5px rgba(0, 0, 0, 0.04)",
				"l-2xl": "-25px 0 50px -12px rgba(0, 0, 0, 0.25)",
				"l-3xl": "-35px 0 60px -15px rgba(0, 0, 0, 0.3)",
				"r-sm": "1px 0 2px 0 rgba(0, 0, 0, 0.05)",
				"r-md": "4px 0 6px -1px rgba(0, 0, 0, 0.1), -2px 0 4px -1px rgba(0, 0, 0, 0.06)",
				"r-lg": "10px 0 15px -3px rgba(0, 0, 0, 0.1), -4px 0 6px -2px rgba(0, 0, 0, 0.05)",
				"r-xl": "20px 0 25px -5px rgba(0, 0, 0, 0.1), -10px 0 10px -5px rgba(0, 0, 0, 0.04)",
				"r-2xl": "25px 0 50px -12px rgba(0, 0, 0, 0.25)",
				"r-3xl": "35px 0 60px -15px rgba(0, 0, 0, 0.3)",
				"all-sm": "0 0 2px 0 rgba(0, 0, 0, 0.05)",
				"all-md": "0 0 6px -1px rgba(0, 0, 0, 0.1), 0 0 4px -1px rgba(0, 0, 0, 0.06)",
				"all-lg": "0 0 15px -3px rgba(0, 0, 0, 0.1), 0 0 6px -2px rgba(0, 0, 0, 0.05)",
				"all-xl": "0 0 25px -5px rgba(0, 0, 0, 0.1), 0 0 10px -5px rgba(0, 0, 0, 0.04)",
				"all-2xl": "0 0 50px -12px rgba(0, 0, 0, 0.25)",
				"all-3xl": "0 0 60px -15px rgba(0, 0, 0, 0.3)",
			},
		},
	},
	plugins: [],
};
