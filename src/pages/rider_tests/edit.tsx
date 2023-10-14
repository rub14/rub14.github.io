import React from "react";
import { IResourceComponentsProps, useSelect } from "@refinedev/core";
import { Edit } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Select,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const RiderTestEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        refineCore: { formLoading, queryResult },
        saveButtonProps,
        register,
        setValue,
        formState: { errors },
    } = useForm();

    const riderTestsData = queryResult?.data?.data;

    const { options: classTestOptions } = useSelect({
        resource: "class_tests",
        defaultValue: riderTestsData?.class_test_id,
    });

    React.useEffect(() => {
        setValue("class_test_id", riderTestsData?.class_test_id?.id);
    }, [classTestOptions]);

    const { options: riderOptions } = useSelect({
        resource: "riders",
        defaultValue: riderTestsData?.rider_id,
    });

    React.useEffect(() => {
        setValue("rider_id", riderTestsData?.rider_id?.id);
    }, [riderOptions]);

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
            <FormControl mb="3" isInvalid={!!errors?.class_test_id}>
                <FormLabel>Class Test</FormLabel>
                <Select
                    placeholder="Select class_test"
                    {...register("class_test_id", {
                        required: "This field is required",
                    })}
                >
                    {classTestOptions?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {(errors as any)?.class_test_id?.message as string}
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
            <FormControl mb="3" isInvalid={!!(errors as any)?.status}>
                <FormLabel>Status</FormLabel>
                <Input
                    type="number"
                    {...register("status", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.status?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.rider_id}>
                <FormLabel>Rider</FormLabel>
                <Select
                    placeholder="Select rider"
                    {...register("rider_id", {
                        required: "This field is required",
                    })}
                >
                    {riderOptions?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {(errors as any)?.rider_id?.message as string}
                </FormErrorMessage>
            </FormControl>
        </Edit>
    );
};
