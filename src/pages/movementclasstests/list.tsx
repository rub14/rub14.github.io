import React from "react";
import {
    IResourceComponentsProps,
    GetManyResponse,
    useMany,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
    List,
    usePagination,
    ShowButton,
    DateField,
    BooleanField,
} from "@refinedev/chakra-ui";
import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    HStack,
    Button,
    IconButton,
    Box,
} from "@chakra-ui/react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons";

export const MovementClassTestList: React.FC<
    IResourceComponentsProps
> = () => {

    const classTestId = localStorage.getItem("classTestId") ?? ""
    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
              id: "class_test_id",
              header: "Class Test",
              accessorKey: "class_test_id",
              cell: function render({ getValue, table }) {
                  const meta = table.options.meta as {
                      classTestData: GetManyResponse;
                  };

                  const classTest = meta.classTestData?.data?.find(
                      (item) => item.id == getValue<any>(),
                  );

                  return classTest?.phase_name ?? "Loading...";
              },
          },
           
            {
              id: "item_num",
              accessorKey: "item_num",
              header: "Item Num",
          },
            {
                id: "is_collective",
                accessorKey: "is_collective",
                header: "Is Collective",
                cell: function render({ getValue }) {
                    return <BooleanField value={getValue<any>()} />;
                },
            },
            {
                id: "description",
                accessorKey: "description",
                header: "Description",
            },
            {
                id: "directive",
                accessorKey: "directive",
                header: "Directive",
            },
            {
                id: "coefficient",
                accessorKey: "coefficient",
                header: "Coefficient",
            },
            {
                id: "max_value",
                accessorKey: "max_value",
                header: "Max Value",
            },
            {
                id: "allowed_increments",
                accessorKey: "allowed_increments",
                header: "Allowed Increments",
            },
            {
                id: "total_movements",
                accessorKey: "total_movements",
                header: "Total Movements",
            },
            {
                id: "actions",
                accessorKey: "id",
                header: "Actions",
                cell: function render({ getValue }) {
                    return (
                        <HStack>
                            <ShowButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                        </HStack>
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        
        refineCore: {
            setCurrent,
            pageCount,
            current,
            
            setFilters,
            tableQueryResult: { data: tableData},
        },
    } = useTable({
        columns,
        refineCoreProps: {
          filters: {
              mode: "server",
              permanent: [
                  {
                      field: "class_test_id",
                      operator: "eq",
                      value: classTestId,
                  },
              ],
          },
          sorters: {
            mode: "server",
            permanent: [
                {
                    field: "item_num",
                    order: "asc",
                },
            ],
        },
      },
    });

    const { data: classTestData } = useMany({
        resource: "class_tests",
        ids: tableData?.data?.map((item) => item?.class_test_id) ?? [],
        queryOptions: {
            enabled: !!tableData?.data,
        },
        
    });

    const { data: movementData } = useMany({
        resource: "movements",
        ids: tableData?.data?.map((item) => item?.id) ?? [],
        queryOptions: {
            enabled: !!tableData?.data,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            classTestData,
            movementData,
        },
    }));

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder &&
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination
                current={current}
                pageCount={pageCount}
                setCurrent={setCurrent}
            />
        </List>
    );
};

type PaginationProps = {
    current: number;
    pageCount: number;
    setCurrent: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
    current,
    pageCount,
    setCurrent,
}) => {
    const pagination = usePagination({
        current,
        pageCount,
    });

    return (
        <Box display="flex" justifyContent="flex-end">
            <HStack my="3" spacing="1">
                {pagination?.prev && (
                    <IconButton
                        aria-label="previous page"
                        onClick={() => setCurrent(current - 1)}
                        disabled={!pagination?.prev}
                        variant="outline"
                    >
                        <IconChevronLeft size="18" />
                    </IconButton>
                )}

                {pagination?.items.map((page) => {
                    if (typeof page === "string")
                        return <span key={page}>...</span>;

                    return (
                        <Button
                            key={page}
                            onClick={() => setCurrent(page)}
                            variant={page === current ? "solid" : "outline"}
                        >
                            {page}
                        </Button>
                    );
                })}
                {pagination?.next && (
                    <IconButton
                        aria-label="next page"
                        onClick={() => setCurrent(current + 1)}
                        variant="outline"
                    >
                        <IconChevronRight size="18" />
                    </IconButton>
                )}
            </HStack>
        </Box>
    );
};
