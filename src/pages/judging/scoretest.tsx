import { useSelect, IResourceComponentsProps, useOne, Option } from "@refinedev/core";
import { Heading, Text, Select, Box, Button, Stack, Spacer } from "@chakra-ui/react";
import {useState, useEffect} from 'react';
import { EnterScore } from "../../components/enterscore";
import { IMovementList} from "../../interfaces/props";
import { useList, HttpError } from "@refinedev/core";
import { useDocumentTitle } from "@refinedev/react-router-v6";
import { useParams } from "react-router-dom";
import {NavLinks} from '../../components/navlinks';


export const ScoreTest: React.FC<IResourceComponentsProps> = () => {                                     
    useDocumentTitle("Score Test | Scoring");
    const { id } = useParams();

    const [activeComp, setActiveComp] = useState('');
    const [activeClassType, setActiveClassType] = useState('');
    const [activeClassTest, setActiveClassTest] = useState('');
    const [activeRiderTestId, setActiveRiderTestId] = useState(0);
    const [activeRecord, setActiveRecord] = useState(0);

    const dummyRecord = {
                class_test_id: 0,
                movement_id: 0,
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

    useEffect(() => {
      setActiveComp(localStorage.getItem("comp") ?? '');
      setActiveClassType( localStorage.getItem("classType") ?? '');
      setActiveClassTest( localStorage.getItem("classTest") ?? '');
      setActiveRiderTestId( parseInt(localStorage.getItem("riderTestId") ?? '0'));

    }, []);

    const { data, isLoading, isError } = useList<IMovementList, HttpError>({
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
                value: id
            },
        ],
    });

    //todo - check if any movements have already been judged

  const handleNextMovement = () => {
      
     /* const index = movements.findIndex(x => x.movement_id === activeRecord?.movement_id);
      if (movements.length - 1 < index)
          setActiveRecord(movements[index+1]);
      else
          alert('last movement record has been reached')
      */
  }

  const handleScoringDone = () => {

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
                <EnterScore onScoreSaved={handleNextMovement} rider={{riderTestId: activeRiderTestId, riderDetails: "new rider"}} movement={data?.data != null ? data.data[activeRecord] : dummyRecord}/>
            }
        
        </Box>
      </>
    );
};
