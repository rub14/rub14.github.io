import { useSelect, IResourceComponentsProps, useOne, Option } from "@refinedev/core";
import { Heading, Text, Select, Box } from "@chakra-ui/react";
import {useState} from 'react';
import {NavLinks} from '../../components/navlinks';

export const EnterJudging: React.FC<IResourceComponentsProps> = () => {
    const [comp, setComp] = useState('');
    const [compId, setCompId] = useState(0);
    const [classType, setClassType] = useState('');
    const [classTypeId, setClassTypeId] = useState(0);
  
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
              value: compId
          },
      ]
    });

    const handleSelectComp = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        
        if (newValue != '')
          setCompId(parseInt(newValue));
        else
          setCompId(0);

        const compIndex = compOptions.findIndex((w) => w.value == newValue)
        if (compIndex != -1)
          setComp(compOptions[compIndex].label);
        else
          setComp('');

      };

      const handleOnClassTypeLoad = () => {

        const classTypeIndex = classTypeOptions.findIndex((w) => w.value == classTypeId.toString())
        console.log("classTypeIndex:",classTypeIndex);
        if (classTypeIndex == -1)
          {
            setClassType('');
            setClassTypeId(0);
          }
      };

    const handleSelectClass = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;

      if (newValue != '')
        setClassTypeId(parseInt(newValue));
      else
        setClassTypeId(0);

      const index = classTypeOptions.findIndex((w) => w.value == newValue)
      if (index != -1)
        setClassType(classTypeOptions[index].label);
      else
        setClassType('');
    };

    return (
        <Box maxW="2xl" m="0 auto">
        <NavLinks selectedDisplay={`${comp.length > 0 ? comp + ": " : ""} ${classType}`}/>
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
