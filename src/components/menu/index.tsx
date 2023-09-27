import React from "react";
import { IconButtonProps, IconButton } from "@chakra-ui/react";
import {
    IconLayoutSidebarLeftCollapse,
    IconLayoutSidebarLeftExpand,
    IconMenu2,
} from "@tabler/icons";

import { useThemedLayoutContext } from "@refinedev/chakra-ui";

const HamburgerIcon = (props: IconButtonProps) => (
    <IconButton variant="ghost" size="sm" {...props} />
);

export const Menu: React.FC = () => {
    const {
        siderCollapsed,
        setSiderCollapsed,
        mobileSiderOpen,
        setMobileSiderOpen,
    } = useThemedLayoutContext();

    return (
        <>
            <HamburgerIcon
                display={{ base: "none", md: "flex" }}
                aria-label="drawer-sidebar-toggle"
                icon={
                    siderCollapsed ? (
                        <IconLayoutSidebarLeftExpand />
                    ) : (
                        <IconLayoutSidebarLeftCollapse />
                    )
                }
                onClick={() => setSiderCollapsed(!siderCollapsed)}
            />
            <HamburgerIcon
                display={{ base: "flex", md: "none" }}
                aria-label="sidebar-toggle"
                icon={<IconMenu2 />}
                onClick={() => setMobileSiderOpen(!mobileSiderOpen)}
            />
            
        </>
    );
};
