import { useSelect, IResourceComponentsProps } from "@refinedev/core";
import { Heading, Text, Select} from "@chakra-ui/react";
import React from "react";
import {useState, useEffect} from 'react';
import {IJudgingComponentProps} from "../../interfaces/props";

export const PickCompTest: React.FC<IJudgingComponentProps> = ({setJudgingSession}) => {
    const [comp, setComp] = useState('');
    const [compId, setCompId] = useState(0);
    const [classType, setClassType] = useState('');
    const [classTypeId, setClassTypeId] = useState(0);
    const [classTest, setClassTest] = useState('');
    const [classTestId, setClassTestId] = useState(0);
    
    const { options: compOptions } = useSelect({
      resource: "competitions",
      optionLabel: "name",
      sorters: [
      {
          field: "name",
          order: "asc",
      },
      ]
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

    const { options: classTestOptions } = useSelect({
      resource: "compclasstests_view",
      optionLabel: "phase_name",
      filters: [
          {
              field: "competition_id",
              operator: "eq",
              value: compId
          },
          {
            field: "class_type_id",
            operator: "eq",
            value: classTypeId
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

        handleJudgingSessionCallback();

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

      handleJudgingSessionCallback();
      
    };

    const handleSelectClassTest = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;

      if (newValue != '')
        setClassTestId(parseInt(newValue));
      else
        setClassTestId(0);

      const index = classTestOptions.findIndex((w) => w.value == newValue)
      if (index != -1)
        setClassTest(classTestOptions[index].label);
      else
        setClassTest('');

      handleJudgingSessionCallback();
    };

    const handleJudgingSessionCallback = () => {
        setJudgingSession({competitionId: compId,
        competitionName: comp,
        classTypeId: classTypeId,
        classTypeName: classType,
        classTestId: classTestId,
        classPhaseName: classTest});
    };

    return (
        <>
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

            <Select 
                w="70%"
                m="0 auto"
                mt="8"
                placeholder='Select Phase'
                onChange={handleSelectClassTest}>
                {classTestOptions?.map(option => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                ))}
            </Select>
        </>
        );
    };