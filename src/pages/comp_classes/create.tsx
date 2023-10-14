import { IResourceComponentsProps, useSelect } from "@refinedev/core";
import { Create } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Select,
    Input,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const CompClassCreate: React.FC<IResourceComponentsProps> = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm();

    const { options: competitionOptions } = useSelect({
        resource: "competitions",
        optionLabel: "name",
    });

    const { options: classTypeOptions } = useSelect({
        resource: "class_types",
        optionLabel: "name",
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
        </Create>
    );
};
