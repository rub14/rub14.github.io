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

export const ClassTestEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        refineCore: { formLoading, queryResult },
        saveButtonProps,
        register,
        setValue,
        formState: { errors },
    } = useForm();

    const classTestsData = queryResult?.data?.data;

    const { options: compClassOptions } = useSelect({
        resource: "comp_classes",
        defaultValue: classTestsData?.comp_class_id,
    });

    React.useEffect(() => {
        setValue("comp_class_id", classTestsData?.comp_class_id?.id);
    }, [compClassOptions]);

    const { options: testOptions } = useSelect({
        resource: "tests",
        defaultValue: classTestsData?.test_id,
        optionLabel: "name",
    });

    React.useEffect(() => {
        setValue("test_id", classTestsData?.test_id?.id);
    }, [testOptions]);

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
            <FormControl mb="3" isInvalid={!!errors?.comp_class_id}>
                <FormLabel>Comp Class</FormLabel>
                <Select
                    placeholder="Select comp_class"
                    {...register("comp_class_id", {
                        required: "This field is required",
                    })}
                >
                    {compClassOptions?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {(errors as any)?.comp_class_id?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!(errors as any)?.phase_num}>
                <FormLabel>Phase Num</FormLabel>
                <Input
                    type="number"
                    {...register("phase_num", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.phase_num?.message as string}
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
            <FormControl mb="3" isInvalid={!!(errors as any)?.phase_name}>
                <FormLabel>Phase Name</FormLabel>
                <Input
                    type="text"
                    {...register("phase_name", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.phase_name?.message as string}
                </FormErrorMessage>
            </FormControl>
        </Edit>
    );
};

