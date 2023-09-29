
import { useSelect, IResourceComponentsProps } from "@refinedev/core";
import { Heading, Text, Select} from "@chakra-ui/react";
import React from "react";
import {useState} from 'react';
import {IJudgingComponentProps} from "../../interfaces/props";
import {NavLinks} from '../../components/navlinks';

export const PickRider: React.FC<IJudgingComponentProps> = ({judgingSession, rider}) => {
    
    const { options: riderOptions } = useSelect({
      resource: "riderclasstests_view",
      optionLabel: "rider_details",
      pagination: {
        mode: "off",
      },
      sorters: [
      {
          field: "back_num",
          order: "asc",
      },
      ],
      filters: [
        {
            field: "class_test_id",
            operator: "eq",
            value: judgingSession?.classTestId
        },   
      ]

    });

    const handleSelectRider = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        
        if (newValue != '')
        { 
            const riderIndex = riderOptions.findIndex((w) => w.value == newValue)
            if (riderIndex != -1)
              setActiveRider(parseInt(newValue),riderOptions[riderIndex].label);
            else
              setActiveRider(0, '');
        }
        else
          setActiveRider(0, '');
    };

    const setActiveRider = (riderTestId: number, riderDetails: string) => {
      if (rider)
        {
          rider.riderTestId = riderTestId;
          rider.riderDetails = riderDetails;
        }
    }

    return (
        <>
            <NavLinks selectedDisplay={
                        {
                          competition: judgingSession.competitionName, 
                          classType: judgingSession.classTypeName, 
                          classTest: judgingSession.classPhaseName
                        }} 
                         show={true} />

            <Heading as="h1" textAlign="center" fontSize="md" mt="100px">
                Rider List
            </Heading>

            <Select 
                w="70%"
                m="0 auto"
                mt="8"
                placeholder='Select Rider'
                onChange={handleSelectRider}>
                {riderOptions?.map(option => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                ))}
            </Select>

        </>
        );
    };