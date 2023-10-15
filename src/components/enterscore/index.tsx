
import { useSelect } from "@refinedev/core";
import { Create, SaveButton} from "@refinedev/chakra-ui";
import {
    Box,
    Spacer,
    Button,
    Text,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Select,
    Input,
    Textarea,
    useRadioGroup,
    Radio,
    useRadio,
    Flex,
    Stack,
    HStack,
    useToast,
    Icon
} from "@chakra-ui/react";
import { IconArrowLeft } from "@tabler/icons";
import { useForm } from "@refinedev/react-hook-form";
import {IJudgingScoringComponentProps} from "../../interfaces/props";
import {useState, useRef, useEffect} from 'react';
import {RadioCard} from "../custom/radiocard"
import { objectInfer } from "@refinedev/inferencer/src/field-inferencers/object";

export const EnterScore: React.FC<IJudgingScoringComponentProps> = ({onScoreSaved, onGoBack, rider, movement})=> {
    const {
        refineCore: { onFinish, formLoading },
        //saveButtonProps,
        register,
        handleSubmit,
        formState: { errors,  },
        reset
    } = useForm({refineCoreProps: {
        onMutationSuccess: () => {
            onScoreSaved();
        },
        onMutationError: () => {
            console.log(errors);
        },
    }});

    const customButtonProps = {
        onClick: handleSubmit(onFinish),
        disabled: false
    };
 
    const footerButtons = <></>;

    useEffect(() => {
        const defaultValues = {
            movement_id: movement?.id,
            score: null,
            comment: null,
            };
        reset({...defaultValues});
    }, [movement]);

    //this was using radio buttons - had to take it out for now as
    // it was getting complicated
    //const [displayScoreSelect, setdisplayScoreSelect] = useState(true);
    
    // const toast = useToast();
    // const inputScoreRef = useRef();
    // const [scoreValue, setScoreValue] = useState(0);
    // const handleChange = (value: any) => {
    //     toast({
    //       title: `The value got changed to ${value}!`,
    //       status: 'success',
    //       duration: 2000,
    //     })
    //     //setScoreValue(value as number);
      
    //   }
    
    //   const { getRootProps, getRadioProps } = useRadioGroup({
    //     name: 'score',
    //     defaultValue: '0'
    //   })

    //   const group = getRootProps();

    //todo - generate score values
    //const score_values = [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10];
    const { options: scoreValueOptions } = useSelect({
    resource: "score_values",
    optionLabel: "description",
    optionValue: "score",
    sorters: [
        {
            field: "score",
            order: "asc",
        },
    ],
    });

    const recordScore = () => {
        
        const retVal = customButtonProps.onClick();

    }

    const movePrevRecord = () => {
        onGoBack();
    }
        
    return (
        <>

<Create resource="score_test" breadcrumb={<></>} title={movement?.is_collective 
                ? `Enter Collective for ${rider.riderDetails}` 
                : `Enter Score for ${rider.riderDetails}` } 
                isLoading={formLoading}
                footerButtons={footerButtons} footerButtonProps={{}}
                goBack={<IconArrowLeft onClick={movePrevRecord} /> }
                saveButtonProps={customButtonProps}>

                <Flex

                align="center"
                wrap={{ base: "wrap", md: "wrap" }}
                bg={movement?.is_collective ? "#C68071" : "#70B74D"}
                mr={{ md: "5" }}
                color="white"
                justifyContent={{ base: "center", md: "center" }}
                >
                <Box display="block" border="1px" padding="1rem" height="100%" width="100%">
                    <h2>Movement #: {movement?.item_num} of {movement?.total_movements}</h2>
                    <Text>
                        {movement?.description}    
                    </Text>
                </Box>
                <Spacer />
                <Box display="block" border="1px" padding="1rem" height="100%" width="100%">
                    <Text display="none">
                        Class Test: {movement?.name}
                    </Text>
                    <Text>
                        {movement?.directive}
                    </Text>
                </Box>
                </Flex>

                <FormControl mt="3" mb="3" isInvalid={!!(errors as any)?.score}>
                <FormLabel>Score</FormLabel>
                <Select
                    placeholder="Select score"
                    {...register("score", {
                        required: "This field is required",
                    })}
                >
                {scoreValueOptions?.map((option) => (
                    <option value={option.value} key={option.value}>
                        {option.value} {option.value.toString().includes(".") ? String.fromCharCode(160).repeat(5) : String.fromCharCode(160).repeat(8)} {option.label}
                    </option>
                ))}
                </Select>

                <FormErrorMessage>
                    {(errors as any)?.score?.message as string}
                </FormErrorMessage>
                </FormControl>

                <FormControl mb="3" isInvalid={!!(errors as any)?.comment}>
                <FormLabel>Comment</FormLabel>
                <Textarea
                    type="text"
                    {...register("comment", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.comment?.message as string}
                </FormErrorMessage>
                </FormControl>
                <FormControl>
                <Input
                type="number"
                display="none"
                defaultValue={rider.riderTestId}
                    {...register("rider_test_id", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                />
                </FormControl>
     
                <FormControl>
                <Input
                    type="number"
                    display="none"
                    defaultValue={movement?.id}
                    {...register("movement_id", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                />

                </FormControl>

                </Create>
             
            <Box
              width='90%'
              m="0 auto"
              py={2}
              mb={2}
            >
                <Stack direction='row' spacing={4} align='center'>          
                    <Spacer />
                    <SaveButton {...customButtonProps}
                        p="8"
                        px="50px"
                        colorScheme='green'
                        borderRadius="10px"
                        mt="8"
                        fontWeight="bold"
                        color="white"
                        fontSize="xl"
                        onClick={recordScore}
                    >Next</SaveButton>
                </Stack>
            </Box>
        </>
    );
};