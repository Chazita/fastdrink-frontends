import { Box, BoxProps, Heading, useColorModeValue } from "@chakra-ui/react";

interface StepperBoxProps extends BoxProps {
	title: string;
	isActive?: boolean;
	isCompleted?: boolean;
}
const StepperBox = ({
	children,
	title,
	isActive,
	isCompleted,
	...props
}: StepperBoxProps) => {
	return (
		<Box
			borderWidth="1px"
			borderRadius="lg"
			boxShadow={"xl"}
			bg={useColorModeValue("gray.100", "gray.900")}
			padding="5"
			w="100%"
			{...props}
		>
			<Heading fontSize={"xl"} mb={isActive ? "2" : ""}>
				{title}
			</Heading>
			{isActive ? <>{children}</> : <></>}
		</Box>
	);
};

export default StepperBox;
