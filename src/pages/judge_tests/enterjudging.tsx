import { useSelect, IResourceComponentsProps, useOne, Option } from "@refinedev/core";
import { Heading, Text, Select, Box } from "@chakra-ui/react";
import {useState} from 'react';
import {NavLinks} from '../../components/navlinks';

export const EnterJudging: React.FC<IResourceComponentsProps> = () => {
    const { options: compOptions } = useSelect({
        resource: "competitions",
        optionLabel: "name"
    });

    const { options: classTypeOptions } = useSelect({
      resource: "class_types",
      optionLabel: "name"
    });

    const [comp, setComp] = useState('');
    const [classType, setClassType] = useState('');
    const handleSelectComp = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const newValue = e.target.value;
          const index = compOptions.findIndex((w) => w.value == newValue)
          if (index != -1)
            setComp(compOptions[index].label);
          else
            setComp('');
        };

    const handleSelectClass = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      const index = classTypeOptions.findIndex((w) => w.value == newValue)
      if (index != -1)
        setClassType(classTypeOptions[index].label);
      else
        setClassType('');
    };

    return (
        <Box maxW="2xl" m="0 auto">
        <NavLinks selectedDisplay={`${comp}: ${classType}`}/>
        <Heading as="h1" textAlign="center" fontSize="5xl" mt="100px">
          Online Scoring
        </Heading>
        <Text fontSize="xl" textAlign="center" mt="30px">
          Equestrian test scoring and judging
        </Text>
        <Select 
          w="fit-content"
          m="0 auto"
          mt="8"
          placeholder='Select Competition'
          onChange={handleSelectComp}>
            {compOptions?.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
            ))}
        </Select>

        <Select 
          w="fit-content"
          m="0 auto"
          mt="8"
          placeholder='Select Class'
          onChange={handleSelectClass}>
            {classTypeOptions?.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
            ))}
        </Select>
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
