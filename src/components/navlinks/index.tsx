import { Box, Heading, Flex, Spacer, Text, Button, Link } from '@chakra-ui/react';
import React from "react";

interface ISelectedDisplay {
    competition: string,
    classType: string,
    classTest: string
}

export const NavLinks: React.FC<{selectedDisplay:ISelectedDisplay, show:boolean}> = ({selectedDisplay, show}) => {
    
    return (
        <Flex
            as="nav"
            border="1px"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1rem"
            bg={{ base: show? "#8DC671" : "transparent"}}
            color="white"
        >
            <Flex
                align="center"
                mr={{ md: "5" }}
                width="100%"
                justifyContent={{ base: "flex-end", md: "flex-end" }}
                >
                <Box
                display={{ base: show ? "block" : "none", md: "block" }}
                mt={{ base: 2, md: 0 }}
                >
                    <Heading as="h1" size="md" letterSpacing={"-.1rem"}>
                        {selectedDisplay.competition}
                    </Heading>
                    <Heading as="h2" size="md" letterSpacing={"-.1rem"}>
                        {selectedDisplay.classType}
                    </Heading>
                </Box>
                <Spacer />
                <Box
                display={{ base: show ? "block" : "none", md: "block" }}
                mt={{ base: 2, md: 0 }}
                >
                    <Heading as="h2" size="md" letterSpacing={"-.1rem"}>
                        {selectedDisplay.classTest}
                    </Heading>
                </Box>
                <Spacer />
                <Box
                    display={{ base: show ? "block" : "none", md: "block" }}
                    mt={{ base: 2, md: 0 }}
                    >
                    <Button bg="transparent" border="1px">
                        Exit
                    </Button>
                </Box>

            </Flex>

            
        </Flex>
      );
    };