import React from "react";
import { IResourceComponentsProps, useSelect } from "@refinedev/core";
import { Edit } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Select,
    Checkbox,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const MovementEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        refineCore: { formLoading, queryResult },
        saveButtonProps,
        register,
        setValue,
        formState: { errors },
    } = useForm();

    const movementsData = queryResult?.data?.data;

    const { options: testOptions } = useSelect({
        resource: "tests",
        defaultValue: movementsData?.test_id,
        optionLabel: "name",
    });

    React.useEffect(() => {
        setValue("test_id", movementsData?.test_id?.id);
    }, [testOptions]);

    const { options: scoreRangeOptions } = useSelect({
        resource: "score_range",
        defaultValue: movementsData?.score_range_id,
    });

    React.useEffect(() => {
        setValue("score_range_id", movementsData?.score_range_id?.id);
    }, [scoreRangeOptions]);

    return (
        <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!(errors as any)?.id}>
                <FormLabel>Id</FormLabel>
                <Input
                    disabled
                    type="number"
                    {...register("id", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.id?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.test_id}>
                <FormLabel>Test</FormLabel>
                <Select
                    placeholder="Select test"
                    {...register("test_id", {
                        required: "This field is required",
                    })}
                >
                    {testOptions?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {(errors as any)?.test_id?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!(errors as any)?.item_num}>
                <FormLabel>Item Num</FormLabel>
                <Input
                    type="number"
                    {...register("item_num", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.item_num?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!(errors as any)?.description}>
                <FormLabel>Description</FormLabel>
                <Input
                    type="text"
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.description?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!(errors as any)?.directive}>
                <FormLabel>Directive</FormLabel>
                <Input
                    type="text"
                    {...register("directive", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.directive?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!(errors as any)?.coefficient}>
                <FormLabel>Coefficient</FormLabel>
                <Input
                    type="number"
                    {...register("coefficient", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.coefficient?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.is_collective}>
                <FormLabel>Is Collective</FormLabel>
                <Checkbox
                    {...register("is_collective", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {errors?.is_collective?.message as string}
                </FormErrorMessage>
            </FormControl>
            {/* 
                    DatePicker component is not included in "@refinedev/chakra-ui" package.
                    To use a <DatePicker> component, you can examine the following links:
                    
                    - https://github.com/aboveyunhai/chakra-dayzed-datepicker
                    - https://github.com/wojtekmaj/react-date-picker
                */}
            <FormControl mb="3" isInvalid={!!(errors as any)?.created_at}>
                <FormLabel>Created At</FormLabel>
                <Input
                    {...register("created_at", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.created_at?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.active}>
                <FormLabel>Active</FormLabel>
                <Checkbox
                    {...register("active", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {errors?.active?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!(errors as any)?.max_value}>
                <FormLabel>Max Value</FormLabel>
                <Input
                    type="number"
                    {...register("max_value", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.max_value?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl
                mb="3"
                isInvalid={!!(errors as any)?.allowed_increments}
            >
                <FormLabel>Allowed Increments</FormLabel>
                <Input
                    type="number"
                    {...register("allowed_increments", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.allowed_increments?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.score_range_id}>
                <FormLabel>Score Range</FormLabel>
                <Select
                    placeholder="Select score_range"
                    {...register("score_range_id", {
                        required: "This field is required",
                    })}
                >
                    {scoreRangeOptions?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {(errors as any)?.score_range_id?.message as string}
                </FormErrorMessage>
            </FormControl>
        </Edit>
    );
};

