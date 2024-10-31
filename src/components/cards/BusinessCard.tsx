import React from "react";
import { CardHeader, Card, Text, Stack, Badge } from "@chakra-ui/react";
import { Business, Hours } from "@/util/db";
import NextImage from "next/image";
import StoreFront from "@/../public/StoreFront.webp";
import { FcTouchscreenSmartphone } from "react-icons/fc";
import { FcGlobe } from "react-icons/fc";
import { FcBusiness } from "react-icons/fc";

export default function BusinessCard({ business }: { business: Business }) {
    const { name, location, website, phone, hours } = business;

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
                <Badge fontSize={20} p={3} mx={5} colorPalette="teal">
                    {name}
                </Badge>
            </CardHeader>
            <Card.Body gap="2">
                <div>
                    {website && (
                        <Text className="flex flex-row">
                            <span>
                                <FcGlobe size={23} />
                            </span>
                            <span className="ml-5">{website}</span>
                        </Text>
                    )}
                </div>

                <Text textStyle="md" fontWeight="light" letterSpacing="tight" mt="2" className="flex flex-row">
                    <span>
                        <FcTouchscreenSmartphone size={23} />
                    </span>
                    <span className="ml-5">Phone: {phone}</span>
                </Text>
                <Text textStyle="md" fontWeight="light" letterSpacing="tight" mt="2" className="flex flex-row">
                    <span>
                        <FcBusiness size={23} />
                    </span>
                    <span className="ml-5">Address: {location}</span>
                </Text>

                {hours && (
                    <Stack textAlign="center" mt={10}>
                        <Text fontWeight="bold" mb="2" textAlign="center">
                            Opening Hours:
                        </Text>
                        {(Object.keys(hours) as Array<keyof Hours>).map((day) => (
                            <Text key={day} textStyle="sm" fontWeight="light" letterSpacing="tight">
                                {day}: {(hours[day] as string[]).map((hour) => hour)}
                            </Text>
                        ))}
                    </Stack>
                )}
            </Card.Body>
        </Card.Root>
    );
}
