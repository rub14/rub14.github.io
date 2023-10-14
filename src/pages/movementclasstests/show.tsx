
import { useShow, IResourceComponentsProps, useOne } from "@refinedev/core";
import {
    Show,
    DateField,
    NumberField,
    TagField,
    BooleanField,
    TextField,
} from "@refinedev/chakra-ui";
import { Heading, HStack } from "@chakra-ui/react";

export const MovementClassTestShow: React.FC<
    IResourceComponentsProps
> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    console.log('queryResult', queryResult);
    console.log('isLoading', isLoading);
    console.log('data', data);
    const record = data?.data;

    const { data: classTestData, isLoading: classTestIsLoading } = useOne({
        resource: "class_tests",
        id: record?.class_test_id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    const { data: movementData, isLoading: movementIsLoading } = useOne({
        resource: "movements",
        id: record?.id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Heading as="h5" size="sm" mt={4}>
                Class Test
            </Heading>
            {classTestIsLoading ? <>Loading...</> : <>{classTestData?.data.phase_name}</>}
            <Heading as="h5" size="sm" mt={4}>
                Movement
            </Heading>
            {movementIsLoading ? <>Loading...</> : <>{movementData?.data.item_num}</>}
           
            <Heading as="h5" size="sm" mt={4}>
                Is Collective
            </Heading>
            <BooleanField value={record?.is_collective} />
            <Heading as="h5" size="sm" mt={4}>
                Description
            </Heading>
            <TextField value={record?.description} />
            <Heading as="h5" size="sm" mt={4}>
                Directive
            </Heading>
            <TextField value={record?.directive} />
            <Heading as="h5" size="sm" mt={4}>
                Coefficient
            </Heading>
            <NumberField value={record?.coefficient ?? ""} />
            <Heading as="h5" size="sm" mt={4}>
                Max Value
            </Heading>
            <NumberField value={record?.max_value ?? ""} />
            <Heading as="h5" size="sm" mt={4}>
                Allowed Increments
            </Heading>
            <NumberField value={record?.allowed_increments ?? ""} />
            <Heading as="h5" size="sm" mt={4}>
                Total Movements
            </Heading>
            <NumberField value={record?.total_movements ?? ""} />
        </Show>
    );
};


