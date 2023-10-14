import { useShow, IResourceComponentsProps, useOne } from "@refinedev/core";
import {
    Show,
    NumberField,
    TagField,
    TextField,
    BooleanField,
    DateField,
} from "@refinedev/chakra-ui";
import { Heading, HStack } from "@chakra-ui/react";

export const MovementShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: testData, isLoading: testIsLoading } = useOne({
        resource: "tests",
        id: record?.test_id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    const { data: scoreRangeData, isLoading: scoreRangeIsLoading } = useOne({
        resource: "score_range",
        id: record?.score_range_id || "",
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
                Test
            </Heading>
            {testIsLoading ? <>Loading...</> : <>{testData?.data?.name}</>}
            <Heading as="h5" size="sm" mt={4}>
                Item Num
            </Heading>
            <NumberField value={record?.item_num ?? ""} />
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
                Is Collective
            </Heading>
            <BooleanField value={record?.is_collective} />
            <Heading as="h5" size="sm" mt={4}>
                Created At
            </Heading>
            <DateField value={record?.created_at} />
            <Heading as="h5" size="sm" mt={4}>
                Active
            </Heading>
            <BooleanField value={record?.active} />
            <Heading as="h5" size="sm" mt={4}>
                Max Value
            </Heading>
            <NumberField value={record?.max_value ?? ""} />
            <Heading as="h5" size="sm" mt={4}>
                Allowed Increments
            </Heading>
            <NumberField value={record?.allowed_increments ?? ""} />
            <Heading as="h5" size="sm" mt={4}>
                Score Range
            </Heading>
            {scoreRangeIsLoading ? (
                <>Loading...</>
            ) : (
                <>{scoreRangeData?.data?.id}</>
            )}
        </Show>
    );
};

