import React from "react";
import { Button, CardHeader, CardFooter, Card, Text, Stack, Badge } from "@chakra-ui/react";
import { Business, Hours } from "@/util/db";
import NextImage from "next/image";
import StoreFront from "@/../public/StoreFront.webp";

export default function BusinessCard({ business }: { business: Business }) {
    const { name, location, website, phone, logo, street_address, zipcode, hours } = business;

    const img =
        business.image_large != null
            ? business.image_large
            : business.image_thumb != null
            ? business.image_thumb
            : business.logo != null
            ? business.logo
            : StoreFront;

    const isLogo = business.logo != null ? business.logo : "/iconlogo.png";

    return (
        <Card.Root maxW="xl" overflow="hidden" m={10}>
            <NextImage src={img} alt="" width={573} height={413} />
            <CardHeader className="flex flex-row items-center gap-2">
                <NextImage
                    src={isLogo}
                    className="size-10 rounded-full"
                    width={40}
                    height={40}
                    alt={business.name}
                ></NextImage>
                <Badge>{name}</Badge>
            </CardHeader>
            <Card.Body gap="2">
                <Card.Title>{website}</Card.Title>

                <Text textStyle="md" fontWeight="light" letterSpacing="tight" mt="2">
                    {phone}
                </Text>
                <Text textStyle="md" fontWeight="light" letterSpacing="tight" mt="2">
                    {location}
                </Text>

                <Text fontWeight="bold" mb="2" textAlign="center">
                    Opening Hours:
                </Text>
                {hours && (
                    <Stack textAlign="center">
                        {(Object.keys(hours) as Array<keyof Hours>).map((day) => (
                            <Text key={day} textStyle="sm" fontWeight="light" letterSpacing="tight">
                                {day}: {(hours[day] as string[]).map((hour) => hour)}
                            </Text>
                        ))}
                    </Stack>
                )}
            </Card.Body>
            <CardFooter gap="2">
                <Button variant="subtle" colorPalette="blue" flex="1">
                    Like
                </Button>
                <Button variant="ghost" colorPalette="pink" flex="1">
                    Review
                </Button>
                <Button className="bg-red-500" variant="solid" colorPalette="yellow" flex="1">
                    Delete
                </Button>
            </CardFooter>
        </Card.Root>
    );
}
