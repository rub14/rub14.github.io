import { IResourceComponentsProps, useOne, HttpError } from "@refinedev/core";
import { NumberField, TagField, DateField } from "@refinedev/chakra-ui";
import { Box, Button, Spacer, Heading, HStack } from "@chakra-ui/react";
import { IRiderTestView } from "../../interfaces/props";
import { useNavigate } from "react-router-dom";

export const TallyScore: React.FC<IResourceComponentsProps> = () => {

    const { data, isLoading, isError } = useOne<IRiderTestView, HttpError>({
        resource: "riderclasstests_view",
        id: localStorage.getItem("riderTestId") ?? ""
    });

    const record = data?.data;

    /*const { data: tallyData, isLoading: tallyIsLoading } = useOne({
        resource: "riderclasstests_view",
        id: record?.competition_id || "",
        queryOptions: {
            enabled: !!record,
        },
    });*/

    const navigate = useNavigate();
    const exitScoring = () => {
        const activeClassTestId = localStorage.getItem("classTestId") ?? ""
        navigate(`../../judging/pickrider/${activeClassTestId}`);
    }

    return (
        <>
            <Heading as="h5" size="sm" mt={4}>
                Rider
            </Heading>
            {isLoading ? (
                <>Loading...</>
            ) : (
                <>{record?.rider_details}</>
            )}  
            <Heading as="h5" size="sm" mt={4}>
                Total Score
            </Heading>
            <NumberField value={record?.total_score ?? ""} />
            <Box
              width='90%'
              m="0 auto"
              display="flex"
              justifyContent="flex-end"
              py={2}
              mb={2}
            >
                <Spacer />
                <Button
                    p="8"
                    px="50px"
                    colorScheme='green'
                    borderRadius="10px"
                    mt="8"
                    fontWeight="bold"
                    color="white"
                    fontSize="xl"
                    onClick={exitScoring}
                    >
                    Done
                </Button>
            </Box>
        </>
    );
};
