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
import {FormEvent, useState} from "react";
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
import {ValueChangeDetails} from "@zag-js/select";
import {ReviewFormData} from "@/actions/actions";

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

export default function CommentsHolder({comments, deleteAction, createAction, businessId}: {
    comments: Array<Comment>,
    deleteAction?: (id: number) => Promise<boolean>
    createAction?: (id: number, data: ReviewFormData) => Promise<{ success: boolean, error?: string }>,
    businessId?: number
}) {
    if (createAction && businessId == undefined) {
        throw new Error("Cannot define a create action without a business ID")
    }

    const {userId} = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<{ review: string[], comment: string }>({review: [], comment: ""});
    const [submitting, setSubmitting] = useState(false);
    const [valueSelectorInvalid, setValueSelectorInvalid] = useState(false);
    const [errorString, setErrorString] = useState<null|string>(null);

    function handleSelectorChange(details: ValueChangeDetails) {
        setFormData(prev => {
            return {
                ...prev,
                review: details.value
            };
        });

    }

    function handleFormChange(e: FormEvent<HTMLInputElement|HTMLTextAreaElement>) {
        const target = e.target as HTMLInputElement|HTMLTextAreaElement
        setFormData(prev => {
            return {
                ...prev,
                [target.name]: target.value
            };
        });
    }

    async function handleSubmission(e: FormEvent) {
        e.preventDefault()
        setSubmitting(true);
        if (!businessId) {
            return;
        }
        try {
            if (formData.review.length == 0) {
                setValueSelectorInvalid(true)
                setErrorString("You must select a review")
                return;
            } else {
                if (valueSelectorInvalid) {
                    setValueSelectorInvalid(false)
                    setErrorString(null)
                }
            }

            const res = await createAction!(businessId, formData);
            if (res.success) {
                // notification?
            } else if (res.error != null) {
                setErrorString(res.error);
            }
        } finally {
            setSubmitting(false)
        }
    }

    console.log(formData);

    return (
        <>
            <CardRoot maxW="xl" overflow="hidden" m={10}>
                <CardHeader className="flex flex-row items-center gap-2 place-content-between">
                    <Text textStyle={"xl"}>Reviews </Text>
                    {createAction && (<Button onClick={() => (setShowForm(!showForm))}>Add Review</Button>)}
                </CardHeader>
                {showForm && (
                    <CardBody>
                        <form onSubmit={handleSubmission}>
                            <Fieldset.Root>
                                <FieldsetRoot>
                                    <FieldsetLegend>What did you think about business?</FieldsetLegend>
                                </FieldsetRoot>
                                <Fieldset.Content>
                                    <Field label="About your stay">
                                        <Textarea name={"comment"} value={formData.comment} onChange={handleFormChange}></Textarea>
                                    </Field>
                                </Fieldset.Content>
                                <Fieldset.Content>
                                    <SelectRoot collection={ratings} value={formData.review} invalid={valueSelectorInvalid}
                                                onValueChange={handleSelectorChange}>
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
                            {errorString && (
                                <Fieldset.ErrorText>{errorString}</Fieldset.ErrorText>
                            )}
                            <Button loading={submitting} type={"submit"}>Submit</Button>
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
