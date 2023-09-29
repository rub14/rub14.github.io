
import { useSelect } from "@refinedev/core";
import { Create } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Select,
    Input,
    Checkbox,
    Textarea
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import {IJudgingComponentProps} from "../../interfaces/props";
import {NavLinks} from '../../components/navlinks';
import { useList, HttpError } from "@refinedev/core";
import {useState} from 'react';

interface IMovementList {
    movementId: number;
    classTestId: number;
    itemNum: number;
    isCollective: boolean;
    description: string;
    directive: string;
    coeffient: number;
    maxValue: number;
    allowedIncrements: number;
}

export const EnterScore: React.FC<IJudgingComponentProps> = ({judgingSession, rider})=> {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm();

    const [activeIndex, setActiveIndex] = useState(0);

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

    const moveNext = () => {
        if (movements.length - 1 < activeIndex)
            setActiveIndex(activeIndex+1);
        else
            alert('last movement record has been reached')
    }

    const clearForm = () => {
        //reset form
    }

    return (
        <>
            <NavLinks selectedDisplay={
                {
                competition: judgingSession.competitionName, 
                classType: judgingSession.classTypeName, 
                classTest: judgingSession.classPhaseName
                }} 
                show={true} />
            <Create title={movements[activeIndex]?.isCollective ? "Enter Collective" : "Enter Score"} isLoading={formLoading} saveButtonProps={saveButtonProps}>
                
                <FormControl mb="3" isInvalid={!!(errors as any)?.score}>
                    <FormLabel>Score</FormLabel>
                    <Input
                        type="number"
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