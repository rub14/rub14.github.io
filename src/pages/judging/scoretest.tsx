import { useSelect, IResourceComponentsProps, useOne, Option } from "@refinedev/core";
import {  
    Box, 
    Spacer,
    useToast
} from "@chakra-ui/react";
import {useState, useEffect} from 'react';
import { EnterScore } from "../../components/enterscore";
import { TallyScore } from "../../components/tallyscore";
import { IMovementList} from "../../interfaces/props";
import { useList, HttpError } from "@refinedev/core";
import { useDocumentTitle } from "@refinedev/react-router-v6";
import { useParams } from "react-router-dom";
import {NavLinks} from '../../components/navlinks';
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons";
import { useResource } from "@refinedev/core";


export const ScoreTest: React.FC<IResourceComponentsProps> = () => {                                     
    useDocumentTitle("Score Test | Scoring");

    const { classTestId} = useParams();
    const { resource } = useResource("class_test_view" )
 
    const footerButtons = <></>;

    const dummyRecord = {
        class_test_id: 0,
        id: 0, //movement_id
        item_num: 0, 
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

    const emptyMovementList = [dummyRecord];

    const [activeCompId, setActiveCompId] = useState(0);
    const [activeComp, setActiveComp] = useState('');
    const [activeClassTypeId, setActiveClassTypeId] = useState(0);
    const [activeClassType, setActiveClassType] = useState('');
    const [activeClassTestId, setActiveClassTestId] = useState(0);
    const [activeClassTest, setActiveClassTest] = useState('');
    const [activeRiderTestId, setActiveRiderTestId] = useState(0);
    const [activeRiderDetails, setActiveRiderDetails] = useState('new rider');
    const [movementList, setMovementList] = useState(emptyMovementList);
    const [id, setId] = useState(0);
    const [scoringDone, setScoringDone] = useState(false);

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

    const { data: movementListData, isLoading: isListLoading, isError: isListError }
         = useList<IMovementList, HttpError>({
        resource: "class_test_view",
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
    });

    useEffect(() => {

        setMovementList(movementListData?.data ?? emptyMovementList);
        setId(movementListData?.data[0].id ?? 0);

    }, [movementListData]);
    const { data, isLoading, isError } = useOne<IMovementList, HttpError>({
        resource: "class_test_view",
        id: id ?? ""
    });

    const activeRecord = data?.data;

    const navigate = useNavigate();
   
    //todo - check if any movements have already been judged (status == 0, judging is not finished)
    // status == 1 edit only (use edit page not create)

    const handleNextMovement = () => { 
        if (data?.data && data?.data.total_movements > data?.data.item_num)
        {
            const index = movementList.findIndex((w) => w.id == data?.data.id)
            if (index > -1)
                setId(movementList[index + 1].id);

        }
        else 
            handleScoringDone();

    }

    const handleScoringDone = () => {
        //todo tally scores, update status to 1 (judged)
        const movementTotal = 
        setScoringDone(true);
    }

    const toast = useToast();

    const movePrevious = () => {

        if (data?.data && data?.data.item_num - 1 > 0)
        {
            toast({
                title: "Edit function not yet available",
                status: 'warning',
                duration: 2000,
            })
            //const index = movementList.findIndex((w) => w.id == data?.data.id)
            //if (index > -1)
            //    setId(movementList[index - 1].id);
        }
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
        <Box
            width='90%'
            m="0 auto"
            display="none"
            justifyContent="flex-end"
            >
            <Spacer />
            <IconArrowRight onClick={handleNextMovement} /> 
        </Box>
        <Box maxW="2xl" m="0 auto">
            {isLoading || isListLoading ? (
                <>Loading...</>
            ) : isError || isListError ? (
                <>Error Loading....</>
            ) : 
                scoringDone ? 
                <TallyScore />
                :
                <EnterScore  onScoreSaved={handleNextMovement} onGoBack={movePrevious} movement={activeRecord ?? dummyRecord} rider={{riderTestId: activeRiderTestId, riderDetails: activeRiderDetails}} />
            
                }

        </Box>
      </>
    );
};
