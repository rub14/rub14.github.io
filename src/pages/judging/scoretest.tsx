import { useSelect, IResourceComponentsProps, useOne, Option } from "@refinedev/core";
import { 
    Heading, 
    FormControl, 
    FormLabel,
    FormErrorMessage, 
    Text, 
    Textarea,
    Select, 
    Input,
    Box, 
    Button, 
    Stack, 
    Spacer,
    Flex 
} from "@chakra-ui/react";
import {useState, useEffect} from 'react';
import { EnterScore } from "../../components/enterscore";
import { IMovementList} from "../../interfaces/props";
import { useList, HttpError } from "@refinedev/core";
import { useDocumentTitle } from "@refinedev/react-router-v6";
import { useParams } from "react-router-dom";
import {NavLinks} from '../../components/navlinks';
import { useForm } from "@refinedev/react-hook-form";
import { Create, SaveButton} from "@refinedev/chakra-ui";


export const ScoreTest: React.FC<IResourceComponentsProps> = () => {                                     
    useDocumentTitle("Score Test | Scoring");

    //const { id } = useParams();

    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
        resetField,
        reset,
        defaultValues,
        clearErrors
    } = useForm();

    const customButtonProps = {
        ...saveButtonProps
    };
 
    const footerButtons = <></>;

    const [activeCompId, setActiveCompId] = useState(0);
    const [activeComp, setActiveComp] = useState('');
    const [activeClassTypeId, setActiveClassTypeId] = useState(0);
    const [activeClassType, setActiveClassType] = useState('');
    const [activeClassTestId, setActiveClassTestId] = useState(0);
    const [activeClassTest, setActiveClassTest] = useState('');
    const [activeRiderTestId, setActiveRiderTestId] = useState(0);
    const [activeRiderDetails, setActiveRiderDetails] = useState('new rider')
    const [activeRecord, setActiveRecord] = useState(0);
    const [id, setId] = useState(1);

    const dummyRecord = {
                class_test_id: 0,
                movement_id: 0,
                id: 0, //item_num
                is_collective: false,
                description: '',
                directive: '',
                coeffient: 0,
                max_value: 0,
                allowed_increments: 0,
                name: '',
                score_range_id: 0,
                total_movements: 0
                }

    useEffect(() => {
        const activeCompId = (localStorage.getItem("compId"));
        const activeClassId = ( localStorage.getItem("classTypeId"));
        const activeClassTestId = ( localStorage.getItem("classTestId"));


      if (activeCompId && activeClassId && activeClassTestId)
      {
        setActiveCompId(parseInt(activeCompId));
        setActiveClassTypeId(parseInt(activeClassId));
        setActiveClassTestId(parseInt(activeClassTestId));
    
        setActiveComp(localStorage.getItem("comp") ?? '');
        setActiveClassType( localStorage.getItem("classType") ?? '');
        setActiveClassTest( localStorage.getItem("classTest") ?? '');
        setActiveRiderTestId( parseInt(localStorage.getItem("riderTestId") ?? '0'));
        setActiveRiderDetails( localStorage.getItem("riderDetails") ?? '');
      }

    }, []);

    /*const { data, isLoading, isError } = useList<IMovementList, HttpError>({
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
                value: activeClassTestId
            },
        ],
    });*/

    const { data, isLoading, isError } = useOne<IMovementList, HttpError>({
        resource: "movementclasstests_view",
        id,
        meta: {
            filter: {
                field: "class_test_id",
                operator: "eq",
                value: activeClassTestId
            },
        }
    });

    const movement = data?.data

    useEffect(() => {
        resetField("comment");
        resetField("score");
        const defaultValues = {movement_id: movement?.movement_id,
                              };
        reset({...defaultValues});
        clearErrors();
    }, [id]);

    //todo - check if any movements have already been judged

  const handleNextMovement = () => {
      
    console.log('next movement');
    /*const index = movements.findIndex(x => x.movement_id === activeRecord?.movement_id);
    if (movements.length - 1 < index)
        setActiveRecord(movements[index+1]);
    else
        alert('last movement record has been reached')
    */
   console.log('data?.total', movement?.total_movements);
    if (movement && movement?.total_movements > id)
        setId(id + 1);
  }

  const handleScoringDone = () => {

  }

  const { options: scoreValueOptions } = useSelect({
    resource: "score_values",
    optionLabel: "description",
    optionValue: "score",
    sorters: [
        {
            field: "score",
            order: "asc",
        },
    ],
    });

    const recordScore = () => {
        saveButtonProps.onClick();
        
        if (!errors.any)
            handleNextMovement();
    }

    const goBack = () => {
  
    }

    return (
    <>
        
        <NavLinks selectedDisplay={
            {
                competition: activeComp, 
                classType: activeClassType, 
                classTest: activeClassTest
            }} 
            show={true} />

        <Box maxW="2xl" m="0 auto">
            {isLoading ? (
                <>Loading...</>
            ) : isError ? (
                <>Error Loading....</>
            ) : 
            
            <Create resource="score_test" title={movement?.is_collective 
                ? `Enter Collective for ${activeRiderDetails}` 
                : `Enter Score for ${activeRiderDetails}` } 
                isLoading={formLoading} saveButtonProps={saveButtonProps} 
                footerButtons={footerButtons} footerButtonProps={{}}>

                <Flex

                align="center"
                wrap={{ base: "wrap", md: "wrap" }}
                bg="green"
                mr={{ md: "5" }}
                color="white"
                justifyContent={{ base: "center", md: "center" }}
                >
                <Box display="block" border="1px" padding="1rem" height="100%" width="100%">
                    <h2>Movement #: {movement?.id} of {movement?.total_movements}</h2>
                    <Text>
                        {movement?.description}    
                    </Text>
                </Box>
                <Spacer />
                <Box display="block" border="1px" padding="1rem" height="100%" width="100%">
                    <Text display="none">
                        Class Test: {movement?.name}
                    </Text>
                    <Text>
                        {movement?.directive}
                    </Text>
                </Box>
                </Flex>

                <FormControl mt="3" mb="3" isInvalid={!!(errors as any)?.score}>
                <FormLabel>Score</FormLabel>
                <Select
                    placeholder="Select score"
                    {...register("score", {
                        required: "This field is required",
                    })}
                >
                {scoreValueOptions?.map((option) => (
                    <option value={option.value} key={option.value}>
                        {option.value} {option.value.toString().includes(".") ? String.fromCharCode(160).repeat(5) : String.fromCharCode(160).repeat(8)} {option.label}
                    </option>
                ))}
                </Select>

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
                <FormControl>
                <Input
                type="number"
          
                defaultValue={activeRiderTestId}
                    {...register("rider_test_id", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                />

                </FormControl>
     
                <FormControl>
                <Input
                    type="number"
          
                    defaultValue={movement?.movement_id}
                    {...register("movement_id", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                />

                </FormControl>

                </Create>
                }

                <Box
                width='90%'
                m="0 auto"
                py={2}
                mb={2}
                >
                <Stack direction='row' spacing={4} align='center'>          
                    <Button
                        p="8"
                        px="50px"
                        colorScheme='green'
                        borderRadius="10px"
                        mt="8"
                        fontWeight="bold"
                        color="white"
                        fontSize="xl"
                        onClick={goBack}
                        >
                        Go Back
                    </Button>
                    <Spacer />
                    <SaveButton {...saveButtonProps}
                        p="8"
                        px="50px"
                        colorScheme='green'
                        borderRadius="10px"
                        mt="8"
                        fontWeight="bold"
                        color="white"
                        fontSize="xl"
                        onClick={recordScore}
                    >Next</SaveButton>
                </Stack>
            </Box>
        </Box>
      </>
    );
};
