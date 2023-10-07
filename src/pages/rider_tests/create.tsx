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
import {useState} from 'react';

export const RiderTestCreate: React.FC<IResourceComponentsProps> = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm();

    const [compClassId, setCompClassId] = useState(0);

    const handleSelectCompClass = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      setCompClassId(parseInt(newValue));
    }

    const { options: compOptions } = useSelect({
      resource: "compclass_view",
      optionLabel: "name",
      pagination: {
        mode: "off",
      },
      sorters: [
      {
          field: "name",
          order: "asc",
      },
      ]
    });

    const { options: classTestOptions } = useSelect({
        resource: "class_tests",
        optionLabel: "phase_name",
        filters: [
          {
              field: "comp_class_id",
              operator: "eq",
              value: compClassId
          },
      ]
    });

    const { options: riderOptions } = useSelect({
        resource: "riders",
        optionLabel: "first_name"
    });


    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
             <Select 
                w="70%"
                m="0 auto"
                mt="8"
                placeholder='Select Competition'
                onChange={handleSelectCompClass}>
                {compOptions?.map(option => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                ))}
            </Select>
            
            <FormControl mb="3" isInvalid={!!errors?.class_test_id}>
                <FormLabel>Class Test</FormLabel>
                <Select
                    placeholder="Select class test"
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
        </Create>
    );
};

