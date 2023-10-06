import { useSelect, IResourceComponentsProps, useList, HttpError } from "@refinedev/core";
import { Heading, Text, Select, Box} from "@chakra-ui/react";
import React from "react";
import {useState} from "react";
import {NavLinks} from '../../components/navlinks';
import { useParams } from "react-router-dom";
import { useDocumentTitle } from "@refinedev/react-router-v6";
import {IClassTestView} from "../../interfaces/props";

export const PickRider: React.FC<IResourceComponentsProps> = () => {
    useDocumentTitle("Pick Rider | Scoring");
    const { id } = useParams();
    const [activeRider, setActiveRider] = useState(0);

    const { data, isLoading, isError } = useList<IClassTestView, HttpError>({
      resource: "compclasstests_view",
      filters: [
          {
              field: "id",
              operator: "eq",
              value: id
          },
      ],
    });

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

          <Box maxW="2xl" m="0 auto">
              {isLoading ? (
                  <>Loading...</>
              ) : isError ? (
                  <>Error Loading....</>
              ) :
              <NavLinks selectedDisplay={
                {
                  competition: data?.any ? data[0].competition_name : "", 
                  classType: data?.any ? data[0].class_types_name : "", 
                  classTest: data?.any ? data[0].phase_name : ""
                }} 
                show={true} />
              }
            
        
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

          </Box>


        </>
        );
    };