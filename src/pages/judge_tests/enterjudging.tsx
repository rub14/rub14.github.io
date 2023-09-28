import { useSelect, IResourceComponentsProps, useOne, Option } from "@refinedev/core";
import { Heading, Text, Select, Box, Button, Stack, Spacer } from "@chakra-ui/react";
import {useState} from 'react';
import {NavLinks} from '../../components/navlinks';
import { PickCompTest } from "../../components/pickcomptest";
import {IJudgingSession} from "../../interfaces/props";


export const EnterJudging: React.FC<IResourceComponentsProps> = () => {
    const [judgingSession, setJudgingSession] = useState({
                                                  competitionId: 0,
                                                  competitionName: '',
                                                  classTypeId: 0,
                                                  classTypeName: '',
                                                  classTestId: 0,
                                                  classPhaseName: ''
                                                });
    const [showNav, setShowNav] = useState(false);

    const pickCompTest = () => {
      return <PickCompTest setJudgingSession={handleSetJudgingSession} />
    }

    const [wizardSteps, setWizardSteps] = useState([
      { key: 'pickCompTest', title: 'Online Scoring', isDone: true, component: pickCompTest }
    ]);
    const [activeStep, setActiveStep] = useState(wizardSteps[0]);
    const steps = ['pickCompTest', 'pickRider', 'enterMovementScore', 'ViewTallyScore'];
    
    const handleSetJudgingSession = (arg: IJudgingSession) => {
      
      setJudgingSession(arg);

    };

  
    return (
      <Box maxW="2xl" m="0 auto">
        <NavLinks selectedDisplay={
                        {
                          competition: judgingSession.competitionName, 
                          classType: judgingSession.classTypeName, 
                          classTest: judgingSession.classPhaseName
                        }} 
                         show={showNav}/>
        
        {activeStep.component()}
        
        <Box
          display='flex'
          alignItems='center'
          justifyContent='flex-end'
          width='90%'
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
            >
              Prev
            </Button>
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
            >
              Start
            </Button>
          </Stack>
        </Box>
      </Box>
    );
};
