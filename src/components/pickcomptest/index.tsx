import { useSelect, IResourceComponentsProps } from "@refinedev/core";
import { Heading, Text, Select} from "@chakra-ui/react";
import React from "react";
import {useState, useEffect} from 'react';
import {IJudgingComponentProps} from "../../interfaces/props";

export const PickCompTest: React.FC<IResourceComponentsProps> = () => {
    const [comp, setComp] = useState('');
    const [compId, setCompId] = useState(0);
    const [classType, setClassType] = useState('');
    const [classTypeId, setClassTypeId] = useState(0);
    const [classTestId, setClassTestId] = useState(0);

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

    useEffect(() => {
      const lastComp = localStorage.getItem("compId");
      const lastClass = localStorage.getItem("classTypeId");
      const lastClassTest = localStorage.getItem("classTestId");

      if (lastComp && lastClass && lastClassTest)
      {
        setCompId(parseInt(lastComp));
        setClassTypeId(parseInt(lastClass));
        setClassTestId(parseInt(lastClassTest));
      }
      //else
       // console.log('default comp not found');
    }, []);
    

    const handleSelectComp = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        
        if (newValue != '')
        {
          const compIndex = compOptions.findIndex((w) => w.value == newValue)
          if (compIndex != -1)
          {
            setCompId(parseInt(newValue));
            setComp(compOptions[compIndex].label);
            clearActiveClassType();
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
          clearActiveClassTest();
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
        {
          setClassTestId(parseInt(newValue));
          setActiveJudgingSession(parseInt(newValue),classTestOptions[index].label);
        }
        else
          clearActiveClassTest();
        
      }
      else
        clearActiveClassTest();
      
    };

    const setActiveJudgingSession = (classTestId: number, classTest: string) => {
      localStorage.setItem("compId", compId.toString());
      localStorage.setItem("comp", comp);
      localStorage.setItem("classTypeId", classTypeId.toString());
      localStorage.setItem("classType", classType);
      localStorage.setItem("classTestId", classTestId.toString());
      localStorage.setItem("classTest", classTest);
    };

    const clearActiveClassTest = () => {
      setClassTestId(0);
      //localStorage.setItem("classTestId", '');
      //localStorage.setItem("classTest", '');
    }

    const clearActiveClassType = () => {
      clearActiveClassTest();
      setClassTypeId(0);
      setClassType('');
      //localStorage.setItem("classTypeId", '');
      //localStorage.setItem("classType", '');
      
    }

    const clearActiveComp = () => {
      clearActiveClassType();
      setCompId(0);
      setComp('');
     //localStorage.setItem("compId", '');
      //localStorage.setItem("comp", '');
      
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
                value={compId}
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
                value={classTypeId}
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
                value={classTestId}
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