import { useSelect, IResourceComponentsProps, useOne, Option } from "@refinedev/core";
import { Heading, Text, Select, Box, Button, Stack, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {useState} from 'react';
import { PickCompTest } from "../../components/pickcomptest";
import { PickRider } from "./pickrider";
import { ScoreTest } from "./scoretest";
import {IJudgingSession, IRider, IMovementList} from "../../interfaces/props";
import { useList, HttpError } from "@refinedev/core";
import { useDocumentTitle } from "@refinedev/react-router-v6";


export const Judging: React.FC<IResourceComponentsProps> = () => {
    useDocumentTitle("Judging | Scoring");

    const activeJudgingSession: IJudgingSession =
      {
        competitionId: '0',
        competitionName: '',
        classTypeId: '0',
        classTypeName: '',
        classTestId: '0',
        classPhaseName: ''
      };

    const activeRider: IRider = 
      {
        riderTestId: 0,
        riderDetails: ''
      }; 
      
    const navigate = useNavigate();

    const pickCompTest = () => {
      //return <PickCompTest judgingSession={activeJudgingSession} />
      
    };

    const pickRider = () => {
      //return <PickRider judgingSession={activeJudgingSession} rider={activeRider} />
      navigate(`pickrider/${activeJudgingSession.classTestId}`)
    };

    const scoreTest = () => {
      //return <ScoreTest judgingSession={activeJudgingSession} rider={activeRider} />
    };

    const [wizardSteps, setWizardSteps] = useState([
      { key: 'pickCompTest', title: 'Online Scoring', isDone: false, page: pickCompTest, showNav: false },
      { key: 'pickRider', title: 'Rider List', isDone: false, page: pickRider, showNav: true },
      { key: 'scoreRiderTest', title: 'Judge Test', isDone: false, page: scoreTest, showNav: true }
  
    ]);
    const [activeStep, setActiveStep] = useState(wizardSteps[0]);
    const steps = ['pickCompTest', 'pickRider', 'enterScore', 'ViewTallyScore'];

    const handleNext = () => {
      if (wizardSteps[wizardSteps.length - 1].key === activeStep.key) {
        alert('You have completed all steps.');
        return;
      }

      const index = wizardSteps.findIndex(x => x.key === activeStep.key);
      setWizardSteps(prevStep => prevStep.map(x => {
        if (x.key === activeStep.key) x.isDone = true;
        return x;
      }))
      setActiveStep(wizardSteps[index + 1]);
      wizardSteps[index + 1].page();
      console.log(activeStep.key, activeStep.page);
      //navigate(`pickrider/${activeJudgingSession.classTestId}`)

    }

    const handleBack = () => {
      const index = wizardSteps.findIndex(x => x.key === activeStep.key);
      if (index === 0) return;
     
      setWizardSteps(prevStep => prevStep.map(x => {
        if (x.key === activeStep.key) x.isDone = false;
        return x;
      }))
      setActiveStep(wizardSteps[index - 1]);
    }

    
    return (
      <Box maxW="2xl" m="0 auto">
        
        <PickCompTest />
                          
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
              onClick={handleBack}
              display={activeStep.key != "enterScore" ? "inline-flex" : "none"}
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
              onClick={handleNext}
              display={activeStep.key != "scoreRiderTest" ? "inline-flex" : "none"}
            >
              {activeStep == wizardSteps[0] ? 'Start' : 'Next'}
            </Button>
           
          </Stack>
        </Box>
      </Box>
    );
};
