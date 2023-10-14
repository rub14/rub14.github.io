import { useShow, IResourceComponentsProps, useOne } from "@refinedev/core";
import { Show, NumberField, TagField, DateField } from "@refinedev/chakra-ui";
import { Heading, HStack } from "@chakra-ui/react";

export const RiderTestShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: classTestData, isLoading: classTestIsLoading } = useOne({
        resource: "class_tests",
        id: record?.class_test_id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    const { data: riderData, isLoading: riderIsLoading } = useOne({
        resource: "riders",
        id: record?.rider_id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Heading as="h5" size="sm" mt={4}>
                Id
            </Heading>
            <NumberField value={record?.id ?? ""} />
            <Heading as="h5" size="sm" mt={4}>
                Class Test
            </Heading>
            {classTestIsLoading ? <>Loading...</> : <>{classTestData?.data.phase_name}</>}
            <Heading as="h5" size="sm" mt={4}>
                Created At
            </Heading>
            <DateField value={record?.created_at} />
            <Heading as="h5" size="sm" mt={4}>
                Status
            </Heading>
            <NumberField value={record?.status ?? ""} />
            <Heading as="h5" size="sm" mt={4}>
                Rider
            </Heading>
            {riderIsLoading ? <>Loading...</> : <>{riderData?.data.first_name + " " + riderData?.data.last_name}</>}
        </Show>
    );
};
