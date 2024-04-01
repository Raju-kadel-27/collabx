import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";

const steps = [{ label: "Setup" }, { label: "Activate" }, { label: "Proceed" }];

export const StepsBody = ({
    variant,
}) => {
    const { nextStep, prevStep, reset, activeStep } = useSteps({
        initialStep: 0,
    });
    const isLastStep = activeStep === steps.length - 1;
    const hasCompletedAllSteps = activeStep === steps.length;
    const bg = useColorModeValue("gray.200", "gray.700");
    return (
        <Flex flexDir="column" width="100%">
            <Steps variant={variant} height={'64'} colorScheme="red" activeStep={activeStep}>
                {steps.map(({ label }, index) => (
                    <Step label={label} key={label}>
                        <Box sx={{ p: 8, bgColor:'gray.200', my: 8, rounded: "md",height:64 }}>
                            <Heading fontSize="xl" textAlign="center">
                                Step {index + 1}
                            </Heading>
                        </Box>
                    </Step>
                ))}
            </Steps>
            {hasCompletedAllSteps && (
                <Box sx={{ bg, my: 8, p: 8, rounded: "md" }}>
                    <Heading fontSize="xl" textAlign={"center"}>
                        Woohoo! All steps completed! 🎉
                    </Heading>
                </Box>
            )}
            <Flex width="100%" justify="flex-end" gap={4}>
                {hasCompletedAllSteps ? (
                    <Button size="sm" onClick={reset}>
                        Reset
                    </Button>
                ) : (
                    <>
                        <Button
                            isDisabled={activeStep === 0}
                            onClick={prevStep}
                            size="sm"
                            variant="ghost"
                        >
                            Prev
                        </Button>
                        <Button size="sm" onClick={nextStep}>
                            {isLastStep ? "Finish" : "Next"}
                        </Button>
                    </>
                )}
            </Flex>
        </Flex>
    );
};