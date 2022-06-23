import { useState } from "react";

type StepsProps = {
	initialState: number;
};

/**
 *
 * @param length how many steps.
 */
export default function useSteps({ initialState }: StepsProps) {
	const [activeStep, setActiveStep] = useState(initialState);

	const nextStep = () => {
		setActiveStep((prev) => prev + 1);
	};

	const prevStep = () => {
		setActiveStep((prev) => prev - 1);
	};

	const setStep = (step: number) => {
		setActiveStep(step);
	};

	const reset = () => {
		setActiveStep(initialState);
	};

	return { nextStep, prevStep, setStep, reset, activeStep };
}
