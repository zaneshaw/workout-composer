import accurateInterval from "accurate-interval";
import React, { useEffect, useState } from "react";

type Props = {
	initial: number;
	onFinish: () => void;
};

const Timer: React.FC<Props> = ({ initial, onFinish }: Props) => {
	const [time, setTime] = useState(initial);

	useEffect(() => {
		const interval = accurateInterval(
			() => {
				setTime(time - 1);
				if (time - 1 <= 0) {
					onFinish();
				}
			},
			1000,
			{ aligned: false, immediate: false }
		);

		return () => interval.clear();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [time]);

	return <>{time}</>;
};

export default Timer;
