
import { useSelect } from "@refinedev/core";
import { Create } from "@refinedev/chakra-ui";
import {
    Box,
    Spacer,
    Text,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Select,
    Input,
    Checkbox,
    Textarea,
    useRadioGroup,
    Radio,
    useRadio,
    Flex,
    Stack,
    HStack,
    useToast
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import {IJudgingComponentProps} from "../../interfaces/props";
import {NavLinks} from '../../components/navlinks';
import { useList, HttpError } from "@refinedev/core";
import {useState, useEffect, useRef} from 'react';
import {RadioCard} from "../custom/radiocard"

interface IMovementList {
    class_test_id: number;
    movement_id: number;
    item_num: number;
    is_collective: boolean;
    description: string;
    directive: string;
    coeffient: number;
    max_value: number;
    allowed_increments: number;
    name: string;
}

export const EnterScore: React.FC<IJudgingComponentProps> = ({judgingSession, rider})=> {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm();

    const { data, isLoading, isError } = useList<IMovementList, HttpError>({
        resource: "movementclasstests_view",
        sorters: [
            {
                field: "item_num",
                order: "asc",
            },
        ],
        filters: [
            {
                field: "class_test_id",
                operator: "eq",
                value: judgingSession.classTestId
            },
        ],
    });

    const movements = data?.data ?? [];
    let firstRecord;
    if (movements.length > 0)
        firstRecord = movements[0];
    else
        firstRecord = {
                        movement_id: 0,
                        item_num: 0,
                        description: '',
                        directive: '',
                        is_collective: false,
                        name: ''

                    };

    const [activeRecord, setActiveRecord] = useState(firstRecord);

    const moveNext = () => {
        
        const index = movements.findIndex(x => x.movement_id === activeRecord.movement_id);
        if (movements.length - 1 < index)
            setActiveRecord(movements[index+1]);
        else
            alert('last movement record has been reached')
        
    }

    const clearForm = () => {
        //reset form
    }

    const [displayScoreSelect, setdisplayScoreSelect] = useState(true);
    
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

    return (
        <>
            <NavLinks selectedDisplay={
                {
                competition: judgingSession.competitionName, 
                classType: judgingSession.classTypeName, 
                classTest: judgingSession.classPhaseName
                }} 
                show={true} />

            <Create title={activeRecord.is_collective ? "Enter Collective" : "Enter Score"} isLoading={formLoading} saveButtonProps={saveButtonProps}>
                <Flex
                    
                    align="center"
                    wrap={{ base: "wrap", md: "wrap" }}
                    bg="green"
                    mr={{ md: "5" }}
                    color="white"
                    justifyContent={{ base: "center", md: "center" }}
                >
                    <Box display="block" border="1px" padding="1rem" height="100%" width="100%">
                        <h2>Movement #: {activeRecord?.item_num} of {movements.length}</h2>
                        <Text>
                            {activeRecord?.description}    
                        </Text>
                    </Box>
                    <Spacer />
                    <Box display="block" border="1px" padding="1rem" height="100%" width="100%">
                        <Text display="none">
                            Class Test: {activeRecord?.name}
                        </Text>
                        <Text>
                            {activeRecord?.directive}
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
                        display={"none"}
                        defaultValue={rider?.riderTestId}
                        {...register("rider_test_id", {
                            required: "This field is required",
                            valueAsNumber: true,
                        })}
                    />
                </FormControl>
                <FormControl>
                    <Input
                        type="number"
                        display={"none"}
                        defaultValue={activeRecord?.movement_id}
                        {...register("movement_id", {
                            required: "This field is required",
                            valueAsNumber: true,
                        })}
                    />
                </FormControl>
            </Create>
        </>
    );
};