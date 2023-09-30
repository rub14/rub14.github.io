
import { useSelect } from "@refinedev/core";
import { Create } from "@refinedev/chakra-ui";
import {
    Box,
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
import {useState, useEffect} from 'react';
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

    const toast = useToast();

    const [displayScoreSelect, setdisplayScoreSelect] = useState(true);
    const [score, setScore] = useState(null);

    const handleChange = (value: any) => {
        toast({
          title: `The value got changed to ${value}!`,
          status: 'success',
          duration: 2000,
        })
        //update the score
        setScore(value);
      }
    
      const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'score_values',
        onChange: handleChange
      })

      const group = getRootProps();

      
      const score_values = [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10];

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
                <Box>
                    <h2>Movement #: {activeRecord?.item_num} of {movements.length}</h2>
                    <Text>
                        Class Test: {activeRecord?.name}
                    </Text>
                    <Text>
                        {activeRecord?.description}    
                    </Text>
                    <Text>
                        {activeRecord?.directive}
                    </Text>
                </Box>

                <FormControl mb="3" isInvalid={!!(errors as any)?.score}>
                    <FormLabel>Score</FormLabel>
 
                    <HStack align="center" justifyContent="center"
                        {...group}
                        wrap="wrap"
                        display={displayScoreSelect ? "inline-flex" : "none"}>
                        {score_values.map((value) => {
                            const radio = getRadioProps({ value })
                            return (
                            <RadioCard key={value} {...radio}>
                                {value}
                            </RadioCard>
                            )
                        })}
                    </HStack>
 
                    <Input
                        type="number"
                        display={"block"}//displayScoreSelect ? "none" : "block"}
                        defaultValue={score}
                        {...register("score", {
                            required: "This field is required",
                            valueAsNumber: true,
                        })}
                    />
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
                
            </Create>
        </>
    );
};