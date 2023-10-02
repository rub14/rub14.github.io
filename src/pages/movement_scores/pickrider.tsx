import { useSelect, IResourceComponentsProps } from "@refinedev/core";
import { Heading, Text, Select} from "@chakra-ui/react";
import React from "react";
import {useState} from "react";
import {NavLinks} from '../../components/navlinks';
import { useParams } from "react-router-dom";

export const PickRider: React.FC<IResourceComponentsProps> = () => {
    
    const { id } = useParams();
    const [activeRider, setActiveRider] = useState(0);
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
            value: id
        },   
      ]

    });

    const handleSelectRider = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        
        if (newValue != '')
          setActiveRider(parseInt(newValue));
        else
          setActiveRider(0);
        
    };

    return (
        <>
        
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