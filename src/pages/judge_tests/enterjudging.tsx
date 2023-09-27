import { useSelect, IResourceComponentsProps, useOne, Option } from "@refinedev/core";
import { Heading, Text, Select, Box } from "@chakra-ui/react";
import {useState} from 'react';
import {NavLinks} from '../../components/navlinks';

export const EnterJudging: React.FC<IResourceComponentsProps> = () => {
    const [comp, setComp] = useState('');
    const [compId, setCompId] = useState(0);
    const [classType, setClassType] = useState('');
  
    const { options: compOptions } = useSelect({
        resource: "competitions",
        optionLabel: "name",
        sorters: [
          {
              field: "name",
              order: "asc",
          },
      ],
    });

    const { options: classTypeOptions } = useSelect({
      resource: "classtypes_view",
      optionLabel: "name",
      filters: [
          {
              field: "competition_id",
              operator: "eq",
              value: compId,
          },
      ]
    });

    const handleSelectComp = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const newValue = e.target.value;
          setCompId(parseInt(newValue));
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
          w="70%"
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
          w="70%"
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
