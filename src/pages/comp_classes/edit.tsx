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

export const CompClassEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        refineCore: { formLoading, queryResult },
        saveButtonProps,
        register,
        setValue,
        formState: { errors },
    } = useForm();

    const compClassesData = queryResult?.data?.data;

    const { options: competitionOptions } = useSelect({
        resource: "competitions",
        defaultValue: compClassesData?.competition_id,
        optionLabel: "name",
    });

    React.useEffect(() => {
        setValue("competition_id", compClassesData?.competition_id?.id);
    }, [competitionOptions]);

    const { options: classTypeOptions } = useSelect({
        resource: "class_types",
        defaultValue: compClassesData?.class_type_id,
        optionLabel: "name",
    });

    React.useEffect(() => {
        setValue("class_type_id", compClassesData?.class_type_id?.id);
    }, [classTypeOptions]);

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
            <FormControl mb="3" isInvalid={!!errors?.competition_id}>
                <FormLabel>Competition</FormLabel>
                <Select
                    placeholder="Select competition"
                    {...register("competition_id", {
                        required: "This field is required",
                    })}
                >
                    {competitionOptions?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {(errors as any)?.competition_id?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.class_type_id}>
                <FormLabel>Class Type</FormLabel>
                <Select
                    placeholder="Select class_type"
                    {...register("class_type_id", {
                        required: "This field is required",
                    })}
                >
                    {classTypeOptions?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {(errors as any)?.class_type_id?.message as string}
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
        </Edit>
    );
};

