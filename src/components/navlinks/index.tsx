import { Box, Heading, Flex, Text, Button, Link } from '@chakra-ui/react';
import React from "react";


export const NavLinks: React.FC<{selectedDisplay:string}> = ({selectedDisplay}) => {

    const show = true;
    return (
        <Flex
            as="nav"
            border="1px"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1.5rem"
            bg="#8DC671"
            color="white"
        >
            <Flex
                align="center"
                mr={{ md: "5" }}
                width={{ base: "100%", md: "auto" }}
                justifyContent={{ base: "space-between", md: "flex-start" }}
                >
                <Heading as="h1" size="md" letterSpacing={"-.1rem"}>
                    {selectedDisplay}
                </Heading>

                <Box
                    display={{ base: show ? "block" : "none", md: "block" }}
                    mt={{ base: 4, md: 0 }}
                    >
                    <Button bg="transparent" border="1px">
                        Exit Judging
                    </Button>
                </Box>

            </Flex>

            
        </Flex>
      );
    };