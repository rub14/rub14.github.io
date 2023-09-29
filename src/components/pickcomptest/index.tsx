import { useSelect, IResourceComponentsProps } from "@refinedev/core";
import { Heading, Text, Select} from "@chakra-ui/react";
import React from "react";
import {useState, useEffect} from 'react';
import {IJudgingComponentProps} from "../../interfaces/props";

export const PickCompTest: React.FC<IJudgingComponentProps> = ({judgingSession}) => {
    const [comp, setComp] = useState('');
    const [compId, setCompId] = useState(0);
    const [classType, setClassType] = useState('');
    const [classTypeId, setClassTypeId] = useState(0);
    
    const { options: compOptions } = useSelect({
      resource: "competitions",
      optionLabel: "name",
      pagination: {
        mode: "off",
      },
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
      pagination: {
        mode: "off",
      },
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
      pagination: {
        mode: "off",
      },
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
        {
          const compIndex = compOptions.findIndex((w) => w.value == newValue)
          if (compIndex != -1)
          {
            setCompId(parseInt(newValue));
            setComp(compOptions[compIndex].label);
          }
          else
            clearActiveComp();
        }  
        else
          clearActiveComp();

    };

    const handleSelectClass = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;

      if (newValue != '')
      {
        const index = classTypeOptions.findIndex((w) => w.value == newValue)
        if (index != -1)
        {
          setClassTypeId(parseInt(newValue));
          setClassType(classTypeOptions[index].label);
        }
        else
          clearActiveClassType();

      } 
      else
        clearActiveClassType();
 
    };

    const handleSelectClassTest = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;

      if (newValue != '')
      {
        const index = classTestOptions.findIndex((w) => w.value == newValue)
        if (index != -1)
          setActiveJudgingSession(parseInt(newValue),classTestOptions[index].label);
        else
          setActiveJudgingSession(0,'');
        
      }
      else
        setActiveJudgingSession(0, '');
      
    };

    const setActiveJudgingSession = (classTestId: number, classTest: string) => {
      judgingSession.competitionId = compId;
      judgingSession.competitionName = comp;
      judgingSession.classTypeId = classTypeId;
      judgingSession.classTypeName = classType;
      judgingSession.classTestId = classTestId;
      judgingSession.classPhaseName = classTest;
    };

    const clearActiveClassType = () => {
      setClassTypeId(0);
      setClassType('');
      judgingSession.classTypeId = 0;
      judgingSession.classTypeName = '';
      judgingSession.classTestId = 0;
      judgingSession.classPhaseName = '';
    }

    const clearActiveComp = () => {
      setCompId(0);
      setComp('');
      judgingSession.competitionId = 0;
      judgingSession.competitionName = '';
      judgingSession.classTypeId = 0;
      judgingSession.classTypeName = '';
      judgingSession.classTestId = 0;
      judgingSession.classPhaseName = '';
    }

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