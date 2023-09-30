import { useSelect, IResourceComponentsProps, useOne, Option } from "@refinedev/core";
import { Heading, Text, Select, Box, Button, Stack, Spacer } from "@chakra-ui/react";
import {useState} from 'react';
import { PickCompTest } from "../../components/pickcomptest";
import { PickRider } from "../../components/pickrider";
import { EnterScore } from "../../components/enterscore";
import {IJudgingSession, IRider} from "../../interfaces/props";


export const EnterJudging: React.FC<IResourceComponentsProps> = () => {
    const activeJudgingSession: IJudgingSession =
      {
        competitionId: 0,
        competitionName: '',
        classTypeId: 0,
        classTypeName: '',
        classTestId: 0,
        classPhaseName: ''
      };

    const activeRider: IRider = 
      {
        riderTestId: 0,
        riderDetails: ''
      };                                         

    const pickCompTest = () => {
      return <PickCompTest judgingSession={activeJudgingSession} />
    };

    const pickRider = () => {
      return <PickRider judgingSession={activeJudgingSession} rider={activeRider} />
    };

    const enterScore = () => {
      return <EnterScore judgingSession={activeJudgingSession} rider={activeRider} />
    };

    const [wizardSteps, setWizardSteps] = useState([
      { key: 'pickCompTest', title: 'Online Scoring', isDone: false, component: pickCompTest, showNav: false },
      { key: 'pickRider', title: 'Rider List', isDone: false, component: pickRider, showNav: true },
      { key: 'enterScore', title: 'Movement Score', isDone: false, component: enterScore, showNav: true }
  
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
    
    const recordScore = () => {
      //todo
    }

    return (
      <Box maxW="2xl" m="0 auto">
        
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
              display={activeStep.key != "enterScore" ? "inline-flex" : "none"}
            >
              {activeStep == wizardSteps[0] ? 'Start' : 'Next'}
            </Button>
            <Button
              p="8"
              px="50px"
              colorScheme='green'
              borderRadius="10px"
              mt="8"
              fontWeight="bold"
              color="white"
              fontSize="xl"
              onClick={recordScore}
              display={activeStep.key == "enterScore" ? "inline-flex" : "none"}
            >
              Done
            </Button>
          </Stack>
        </Box>
      </Box>
    );
};
