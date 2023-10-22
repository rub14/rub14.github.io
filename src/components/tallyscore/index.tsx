import { IResourceComponentsProps, useOne, useBack, useSelect, HttpError } from "@refinedev/core";
import { NumberField, TagField, DateField, Edit } from "@refinedev/chakra-ui";
import { 
    Box, 
    Button, 
    Spacer, 
    Heading, 
    Text,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Select,
    Input,
    Checkbox,
    Textarea, } from "@chakra-ui/react";
import { IRiderTallyView } from "../../interfaces/props";
import { useNavigate } from "react-router-dom";
import { useForm } from "@refinedev/react-hook-form";
import React from "react";

export const TallyScore: React.FC<IResourceComponentsProps> = () => {

    const { data, isLoading, isError } = useOne<IRiderTallyView, HttpError>({
        resource: "tally_view",
        id: localStorage.getItem("riderTestId") ?? "",
        
    });

    const record = data?.data;
    const maxScore = data?.data.max_score;

    /*const { data: tallyData, isLoading: tallyIsLoading } = useOne({
        resource: "riderclasstests_view",
        id: record?.competition_id || "",
        queryOptions: {
            enabled: !!record,
        },
    });*/

    const navigate = useNavigate();

    const {
        refineCore: { onFinish, formLoading },
        //saveButtonProps,
        register,
        handleSubmit,
        formState: { errors,  },
        setValue,
        getValues,
        reset
    } = useForm({refineCoreProps: {
        resource: "rider_tests",
        onMutationSuccess: () => {
            const activeClassTestId = localStorage.getItem("classTestId") ?? ""
            //navigate(`../../judging/pickrider/${activeClassTestId}`);
        },
        onMutationError: () => {
            console.log(errors);
        },
    }});

    const footerButtons = <></>;

    const customButtonProps = {
        onClick: handleSubmit(onFinish),
        disabled: false
    };    

    const moveBack = () => {
        //todo
        
    }

    const { options: testErrorOptions } = useSelect({
        resource: "class_test_error_types",
        optionLabel: "description",
        optionValue: "error_code",
        sorters: [
            {
                field: "error_code",
                order: "asc",
            },
        ],
        filters: [
            {
                field: "class_test_id",
                operator: "eq",
                value: localStorage.getItem("classTestId") ?? ""
            },   
        ]
        });

        React.useEffect(() => {
            setValue("test_error", data?.data.test_error ?? '');
        }, [testErrorOptions]);

        React.useEffect(() => {
            setValue("id", data?.data.id ?? 0);
        }, [data]);

        React.useEffect(() => {
            setValue("movement_totals", data?.data.movement_totals ?? 0);
        }, [data]);

        React.useEffect(() => {
            setValue("collective_totals", data?.data.collective_totals ?? 0);
        }, [data]);

        React.useEffect(() => {
            setValue("deductions", data?.data.deductions ?? 0);
        }, [data]);

        React.useEffect(() => {
            setValue("total_score", data?.data.total_score ?? 0);
        }, [data]);

        React.useEffect(() => {
            setValue("status", 1);
        }, [data]);

    const handleAddDeductions = () => {
        const deductions = getValues("deductions");
        const totalScore = data?.data.total_score ?? 0;
       
        if (!isNaN(parseFloat(deductions)) && totalScore > 0)
            setValue("total_score",  totalScore - parseFloat(deductions));

    }

    const exitScoring = () => {
        handleAddDeductions();
        //todo - save form
    }

    return (
        <>
            <Heading as="h5" size="sm" mt={4}>
                Rider
            </Heading>
            {isLoading ? (
                <>Loading...</>
            ) : (
                <>Back Num: {record?.back_num} Rider: {record?.rider_name}</>
            )}  
            <Heading as="h5" size="sm" mt={4}>
                Total Movements Score
            </Heading>
            <NumberField value={record?.movement_totals ?? ""} />
            <Heading as="h5" size="sm" mt={4}>
                Total Collectives Score
            </Heading>
            <NumberField value={record?.collective_totals ?? ""} />
            <Heading as="h5" size="sm" mt={4}>
                Deductions
            </Heading>
            <NumberField value={record?.deductions ?? ""} />
            <Heading as="h5" size="sm" mt={4}>
                Total Score
            </Heading>
            <NumberField value={record?.total_score ?? ""} />
            <Heading as="h5" size="sm" mt={4}>
                Maximum Marks
            </Heading>
            <NumberField value={record?.max_score ?? ""} />
            <Heading as="h5" size="sm" mt={4}>
                Percentage
            </Heading>
            <Text>{record?.total_score / record?.max_score * 100 ?? ""} %</Text>
            
            <Edit isLoading={formLoading} headerButtons={<></>} 
                saveButtonProps={customButtonProps}
                footerButtons={footerButtons} footerButtonProps={{}}
                breadcrumb={<></>} title={"Errors and Deductions"}
                goBack={<></>}>
                <FormControl mb="3" isInvalid={!!(errors as any)?.id}>
                    <Input
                        //disabled
                        display="none" 
                        type="number"
                        {...register("id", {
                            required: "This field is required",
                            valueAsNumber: true,
                        })}
                    />
                </FormControl>
                <FormControl mb="3" isInvalid={!!(errors as any)?.status}>
                    <Input
                        display="none"
                        type="number"
                        {...register("status", {
                            required: "This field is required",
                            valueAsNumber: true,
                        })}
                    />

                </FormControl>
                <FormControl mb="3" isInvalid={!!errors?.class_test_id}>
                    <FormLabel>Errors</FormLabel>
                    <Select
                        placeholder="Select errors if any"
                        {...register("test_error")}
                    >
                        {testErrorOptions?.map((option) => (
                            <option value={option.value} key={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl mb="3" isInvalid={!!errors?.is_disqualified}>
                    <FormLabel>Disqualified</FormLabel>
                    <Checkbox
                        {...register("is_disqualified", {
                            required: "This field is required",
                        })}
                    />
                    <FormErrorMessage>
                        {errors?.is_disqualified?.message as string}
                    </FormErrorMessage>
                </FormControl>
                <FormControl mb="3" isInvalid={!!errors?.is_eliminated}>
                    <FormLabel>Eliminated</FormLabel>
                    <Checkbox
                        {...register("is_eliminated", {
                            required: "This field is required",
                        })}
                    />
                    <FormErrorMessage>
                        {errors?.is_eliminated?.message as string}
                    </FormErrorMessage>
                </FormControl>
                <FormControl mb="3" isInvalid={!!errors?.reason}>
                    <FormLabel>Explain errors / disqualification / elimination</FormLabel>
                    <Textarea
                        type="text"
                        {...register("reason")}
                    />
                </FormControl>
                <FormControl mb="3" isInvalid={!!(errors as any)?.deductions}>
                <FormLabel>Add Deductions</FormLabel>
                <Input
                    type="number"
                    defaultValue="0"
                    {...register("deductions", {
                        required: "This field is required",
                        valueAsNumber: true,
                        validate: (value: number) => value >= 0
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.deductions?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl>
                <Input
                    type="number" 
                    display="none" 
                    {...register("movement_totals", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                />
            </FormControl>
            <FormControl>
                <Input
                    type="number" 
                    display="none" 
                    {...register("collective_totals", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                />
            </FormControl>
            <FormControl>
                <Input
                    type="number" 
                    display="none"
                    {...register("total_score", {
                        required: "This field is required",
                        valueAsNumber: true,
                        validate: (value: number) => value <= record?.max_score - deductions?.value,
                    })}
                />  
            </FormControl>
            </Edit>
            <Box
              width='90%'
              m="0 auto"
              display="flex"
              justifyContent="flex-end"
              py={2}
              mb={2}
            >
                <Spacer />
                <Button
                    p="8"
                    px="50px"
                    colorScheme='green'
                    borderRadius="10px"
                    mt="8"
                    fontWeight="bold"
                    color="white"
                    fontSize="xl"
                    onClick={exitScoring}
                    >
                    Done
                </Button>
            </Box>
        </>
    );
};
