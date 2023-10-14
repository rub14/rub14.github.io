import { useShow, IResourceComponentsProps, useOne } from "@refinedev/core";
import { Show, NumberField, TagField, DateField } from "@refinedev/chakra-ui";
import { Heading, HStack } from "@chakra-ui/react";

export const CompClassShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: competitionData, isLoading: competitionIsLoading } = useOne({
        resource: "competitions",
        id: record?.competition_id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    const { data: classTypeData, isLoading: classTypeIsLoading } = useOne({
        resource: "class_types",
        id: record?.class_type_id || "",
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
                Competition
            </Heading>
            {competitionIsLoading ? (
                <>Loading...</>
            ) : (
                <>{competitionData?.data?.name}</>
            )}
            <Heading as="h5" size="sm" mt={4}>
                Class Type
            </Heading>
            {classTypeIsLoading ? (
                <>Loading...</>
            ) : (
                <>{classTypeData?.data?.name}</>
            )}
            <Heading as="h5" size="sm" mt={4}>
                Created At
            </Heading>
            <DateField value={record?.created_at} />
        </Show>
    );
};

