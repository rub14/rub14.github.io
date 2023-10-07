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
    const [activeRiderTestId, setActiveRiderTestId] = useState(0);
    const [activeRiderDetails, setActiveRiderDetails] = useState('');
    const [activeComp, setActiveComp] = useState('');
    const [activeClassType, setActiveClassType] = useState('');
    const [activeClassTest, setActiveClassTest] = useState('');

    useEffect(() => {
      setActiveComp(localStorage.getItem("comp") ?? '');
      setActiveClassType( localStorage.getItem("classType") ?? '');
      setActiveClassTest( localStorage.getItem("classTest") ?? '');
      
      const riderTestId = (localStorage.getItem("riderTestId"));
      if (riderTestId)
        setActiveRiderTestId(parseInt(riderTestId))

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
      const newValue = e.target.value
      localStorage.setItem("riderTestId", newValue);
      if (newValue != '')
      {
        const index = riderOptions.findIndex((w) => w.value == newValue);
        if (index != -1)
        {
          setActiveRiderTestId(parseInt(newValue));
          setActiveRiderDetails(riderOptions[index].label);
          setActiveRider( newValue, riderOptions[index].label );
        }
        else
          clearActiveRider();
      }
      else
      {
        clearActiveRider();
      }
    };

    const clearActiveRider = () => {
        setActiveRiderTestId(0);
        setActiveRiderDetails('');
        localStorage.setItem("riderTestId", '');
        localStorage.setItem("riderDetails", '');
    }

    const setActiveRider = (riderTestId: string, riderDetails: string) => {
      localStorage.setItem("riderTestId", riderTestId);
      localStorage.setItem("riderDetails", riderDetails);
    }

    const navigate = useNavigate();

    const handleBack = () => {
      navigate("/judging")

    }

    const handleNext = () => {
      navigate(`/judging/scoretest/${activeRiderTestId}`)

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
                defaultValue={activeRiderTestId}
                onChange={handleSelectRider}>
                {riderOptions?.map(option => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                ))}
            </Select>

            <Box
              width='90%'
              m="0 auto"
              py={2}
              mb={2}
            >
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
          </Box>


        </>
        );
    };