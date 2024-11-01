import { Business, Location } from "@/util/db";
import { Box, Card, CardRoot } from "@chakra-ui/react";
import Image from "next/image";
import StoreFront from "@/../public/StoreFront.webp";
import { redirect } from "next/navigation";

export default function BusinessEntry({ business }: { business: Business & Location }) {
    const img =
        business.image_large != null
            ? business.image_large
            : business.image_thumb != null
            ? business.image_thumb
            : business.logo != null
            ? business.logo
            : StoreFront;

    async function navigate() {
        "use server";
        redirect(`/business/${business.id}`);
    }

    return (
        <>
            <div onClick={navigate}>
                <CardRoot flexDirection={"row"} marginBottom={1} className={"cursor-pointer"}>
                    <Image width={128} height={128} src={img} alt={business.name} />
                    <Box ml={2}>
                        <Card.Title mb={2}>{business.name}</Card.Title>
                        <Card.Body>
                            <Card.Description>{business.street_address}</Card.Description>
                        </Card.Body>
                        <Card.Footer>{business.location}</Card.Footer>
                    </Box>
                </CardRoot>
            </div>
        </>
    );
}
