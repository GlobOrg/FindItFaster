"use client";
import {
    CardBody,
    CardFooter,
    CardHeader,
    CardRoot, createListCollection,
    Fieldset, FieldsetLegend, FieldsetRoot,
    Flex,
    Group,
    HStack,
    Stack,
    Text, Textarea
} from "@chakra-ui/react";
import React from "react";
import {Button} from "@/components/ui/button";
import {Avatar} from "@/components/ui/avatar";
import {useAuth} from "@clerk/clerk-react";
import {Field} from "@/components/ui/field";
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select";

export type Comment = {
    id: number;
    image: string;
    author: string;
    authorClerk: string;
    content: string;
    rating: number
}

const ratings = createListCollection({
    items: [
        {label: "5", value: 5},
        {label: "4", value: 4},
        {label: "3", value: 3},
        {label: "2", value: 2},
        {label: "1", value: 1},
    ]
});

export default function CommentsHolder({createAction, comments, deleteAction}: {
    createAction?: (data: FormData) => void,
    comments: Array<Comment>,
    deleteAction?: (id: number) => Promise<boolean>
}) {
    const {userId} = useAuth();
    const [showForm, setShowForm] = React.useState(false);
    return (
        <>
            <CardRoot maxW="xl" overflow="hidden" m={10}>
                <CardHeader className="flex flex-row items-center gap-2 place-content-between">
                    <Text textStyle={"xl"}>Reviews </Text>
                    {createAction && (<Button onClick={() => (setShowForm(!showForm))}>Add Review</Button>)}
                </CardHeader>
                {showForm && (
                    <CardBody>
                        <form action={createAction}>
                            <Fieldset.Root>
                                <FieldsetRoot>
                                    <FieldsetLegend>What did you think about business?</FieldsetLegend>
                                </FieldsetRoot>
                                <Fieldset.Content>
                                    <Field label="About your stay">
                                        <Textarea name={"comment"}></Textarea>
                                    </Field>
                                    <SelectRoot collection={ratings}>
                                        <SelectLabel>Rating</SelectLabel>
                                        <SelectTrigger>
                                            <SelectValueText placeholder={"rating"}/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ratings.items.map((rating) => (
                                                <SelectItem key={rating.label} item={rating}>{rating.value}</SelectItem>
                                            ))
                                            }
                                        </SelectContent>
                                    </SelectRoot>
                                </Fieldset.Content>
                            </Fieldset.Root>
                            <Button type={"submit"}>Submit</Button>
                        </form>
                    </CardBody>
                )}
                <CardFooter></CardFooter>
            </CardRoot>
            {comments.map((comment) => (
                <CardRoot key={comment.id}>
                    <CardHeader>
                        <Flex justifyContent="space-between">
                            <HStack>
                                <Avatar src={comment.image}/>
                                <Stack>
                                    <Text>{comment.author}</Text>
                                </Stack>
                            </HStack>
                            {userId != null && comment.authorClerk === userId && deleteAction && (
                                <Group>
                                    <Button bg={"red.500"} onClick={() => {
                                        deleteAction!(comment.id);
                                    }}>Delete</Button>
                                    <Button bg={"blue.400"}>Edit</Button>
                                </Group>)
                            }
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        {comment.content}
                    </CardBody>
                </CardRoot>
            ))}
        </>
    );
}
