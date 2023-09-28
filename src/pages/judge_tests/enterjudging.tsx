import { useSelect, IResourceComponentsProps, useOne, Option } from "@refinedev/core";
import { Heading, Text, Select, Box } from "@chakra-ui/react";
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
    const [showNav, setShowNav] = useState(true);
    
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
        
        <PickCompTest setJudgingSession={handleSetJudgingSession} />
        <Text
          w="fit-content"
          p="4"
          px="50px"
          bg="#8DC671"
          borderRadius="10px"
          m="0 auto"
          mt="8"
          fontWeight="bold"
          color="white"
          fontSize="xl"
        >
          Start
        </Text>
      </Box>
    );
};
