import { IResourceComponentsProps } from "@refinedev/core";
import { Create } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Checkbox,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const TestCreate: React.FC<IResourceComponentsProps> = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm();

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!(errors as any)?.name}>
                <FormLabel>Name</FormLabel>
                <Input
                    type="text"
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.name?.message as string}
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
        </Create>
    );
};
