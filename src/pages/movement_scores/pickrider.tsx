import { useSelect, IResourceComponentsProps, useList, HttpError } from "@refinedev/core";
import { Heading, Text, Select, Box, Button, Stack, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";
import {useState, useEffect} from "react";
import {NavLinks} from '../../components/navlinks';
import { useParams } from "react-router-dom";
import { useDocumentTitle } from "@refinedev/react-router-v6";

export const PickRider: React.FC<IResourceComponentsProps> = () => {
    useDocumentTitle("Pick Rider | Scoring");
    const { id } = useParams();
    const [activeRider, setActiveRider] = useState(0);
    const [activeComp, setActiveComp] = useState('');
    const [activeClassType, setActiveClassType] = useState('');
    const [activeClassTest, setActiveClassTest] = useState('');

    useEffect(() => {
      setActiveComp(localStorage.getItem("comp") ?? '');
      setActiveClassType( localStorage.getItem("classType") ?? '');
      setActiveClassTest( localStorage.getItem("classTest") ?? '');

      console.log("activeComp", activeComp);
      console.log("activeClassType", activeClassType);
      console.log("activeClassTest", activeClassTest);
    }, []);


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

    const navigate = useNavigate();

    const handleBack = () => {
      navigate("/judging")

    }

    const handleNext = () => {
      //navigate(`scoretest${riderTestId}`)

    }

    return (
        <>

          <Box maxW="2xl" m="0 auto">
      
              <NavLinks selectedDisplay={
                {
                  competition: activeComp, 
                  classType: activeClassType, 
                  classTest: activeClassTest
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

            <Stack direction='row' spacing={4} align='center'>
              <Button
                  p="8"
                  px="50px"
                  colorScheme='green'
                  borderRadius="10px"
                  mt="8"
                  fontWeight="bold"
                  color="white"
                  fontSize="xl"
                  onClick={handleBack}
                >
                  Prev
                </Button>
                <Spacer />
                <Button
                  p="8"
                  px="50px"
                  colorScheme='green'
                  borderRadius="10px"
                  mt="8"
                  fontWeight="bold"
                  color="white"
                  fontSize="xl"
                  onClick={handleNext}
                >
                  Next
                </Button>
              
              </Stack>

          </Box>


        </>
        );
    };