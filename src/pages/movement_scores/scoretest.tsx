import { useSelect, IResourceComponentsProps, useOne, Option } from "@refinedev/core";
import { Heading, Text, Select, Box, Button, Stack, Spacer } from "@chakra-ui/react";
import {useState} from 'react';
import { EnterScore } from "../../components/enterscore";
import {IJudgingScoringComponentProps, IMovementList} from "../../interfaces/props";
import { useList, HttpError } from "@refinedev/core";
import { useDocumentTitle } from "@refinedev/react-router-v6";



export const ScoreTest: React.FC<IJudgingScoringComponentProps> = ({judgingSession, rider}) => {                                     
    useDocumentTitle("Score Test | Scoring");
    /*const [movements, setMovements] = useState([{
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
                                            }]);
    const [activeRecord, setActiveRecord] = useState({
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
                                            });
   */                                         
    //Movements scoring
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
                value: judgingSession.classTestId
            },
        ],
    });

    //todo - check if any movements have already been judged
    /*if (data?.any)
    {
        setMovements(data?.data);
        setActiveRecord(data?.data[0]);
    }
*/

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
      <Box maxW="2xl" m="0 auto">
            {isLoading ? (
                <>Loading...</>
            ) : isError ? (
                <>Error Loading....</>
            ) :
                <EnterScore judgingSession={judgingSession} rider={rider} onScoreSaved={handleNextMovement} movement={data?.any ? data[0] : {}}/>
            }
        
        <Box
          display='flex'
          alignItems='center'
          justifyContent='flex-end'
          width='90%'
          py={2}
          mb={2}
        >

            <Button
              p="8"
              px="50px"
              colorScheme='green'
              borderRadius="10px"
              mt="8"
              fontWeight="bold"
              color="white"
              fontSize="xl"
              onClick={handleScoringDone}
            >
              Done
            </Button>
        </Box>
      </Box>
    );
};
