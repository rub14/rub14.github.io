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
 
    const footerButtons = <></>;

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


    const [activeCompId, setActiveCompId] = useState(0);
    const [activeComp, setActiveComp] = useState('');
    const [activeClassTypeId, setActiveClassTypeId] = useState(0);
    const [activeClassType, setActiveClassType] = useState('');
    const [activeClassTestId, setActiveClassTestId] = useState(0);
    const [activeClassTest, setActiveClassTest] = useState('');
    const [activeRiderTestId, setActiveRiderTestId] = useState(0);
    const [activeRiderDetails, setActiveRiderDetails] = useState('new rider')
    const [id, setId] = useState(1);

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

    const activeRecord = data?.data;
   
    //todo - check if any movements have already been judged

    const handleNextMovement = () => { 
        if (data?.data && data?.data.total_movements > id)
            setId(id + 1);
    }

    const handleScoringDone = () => {

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
                <EnterScore  onScoreSaved={handleNextMovement} movement={activeRecord ?? dummyRecord} rider={{riderTestId: activeRiderTestId, riderDetails: activeRiderDetails}} />
            
                }

        </Box>
      </>
    );
};
