"use client";
import { ChangeEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Category } from "@/util/db";
import { AbsoluteCenter, Link, Stack, Text } from "@chakra-ui/react";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "@/components/ui/accordion";
import { HiCursorClick } from "react-icons/hi";

export default function SearchComponentBox({
    locations,
    categories,
}: {
    locations: Array<{ id: number; location_name: string; country: string }>;
    categories: Array<{ id: number; name: string }>;
}) {
    const router = useRouter();
    const path = usePathname();
    const currentQuery = useSearchParams();
    const [selectedLocations, setSelectedLocations] = useState<Array<number>>([]);
    const [selectedCategories, setSelectedCategories] = useState<Array<number>>([]);
    const [value, setValue] = useState([""]);

    function updateSelectedLocations(e: ChangeEvent<HTMLInputElement>) {
        const targetNum = Number(e.target.value);
        if (targetNum == null || isNaN(targetNum)) {
            return;
        }

        const newVal = e.target.checked as boolean;
        if (newVal) {
            setSelectedLocations((prev) => {
                const ret = [...prev];
                ret.push(targetNum);
                return ret;
            });
        } else {
            setSelectedLocations((prev) => {
                const ret: Array<number> = [];
                prev.forEach((val) => {
                    if (val != targetNum) {
                        ret.push(val);
                    }
                });
                return ret;
            });
        }
    }

    function updateSelectedCategories(e: ChangeEvent<HTMLInputElement>) {
        const targetNum = Number(e.target.value);
        if (targetNum == null || isNaN(targetNum)) {
            return;
        }

        const newVal = e.target.checked as boolean;
        if (newVal) {
            setSelectedCategories((prev) => {
                const ret = [...prev];
                ret.push(targetNum);
                return ret;
            });
        } else {
            setSelectedCategories((prev) => {
                const ret: Array<number> = [];
                prev.forEach((val) => {
                    if (val != targetNum) {
                        ret.push(val);
                    }
                });
                return ret;
            });
        }
    }

    function handleNavigate() {
        const searchParams = new URLSearchParams();
        currentQuery.entries().forEach((item) => {
            searchParams.set(item[0], item[1]);
        });

        searchParams.set("location", selectedLocations.join(","));
        searchParams.set("category", selectedCategories.join(","));
        searchParams.set("page", "1");

        router.push(`${path}?${searchParams.toString()}`);
    }

    const map = new Map<string, Array<Category & { id: number }>>();

    categories.forEach((category) => {
        const initial = category.name.slice(0, 1).toUpperCase();
        const set = map.get(initial) || new Array<Category & { id: number }>();
        set.push(category);
        map.set(initial, set);
    });

    const sortedCatMap = new Map([...map.entries()].sort());

    return (
        <div className="m-4">
            <Button color="bg-michelle" onClick={handleNavigate}>
                Filter
            </Button>
            <form action={"#"}>
                <Text fontWeight="bold" className="text-xl mt-4 mb-5 text-shaneypie">
                    Locations
                </Text>
                {locations.map((location) => (
                    <div key={location.id}>
                        <input
                            id={`loc-${location.id}`}
                            type={"checkbox"}
                            value={location.id}
                            onChange={updateSelectedLocations}
                            checked={selectedLocations.includes(location.id)}
                        ></input>
                        <label htmlFor={`loc-${location.id}`} className="pl-5">
                            {location.location_name}, {location.country}
                        </label>
                    </div>
                ))}

                <Stack gap="4">
                    <Text fontWeight="bold" className="text-xl mt-10">
                        Categories:{" "}
                    </Text>
                    <AccordionRoot value={value} onValueChange={(e) => setValue(e.value)} className="text-sm">
                        {Array.from(sortedCatMap.entries()).map((catKey, index) => (
                            <AccordionItem key={catKey[0]} value={catKey[0]} className="">
                                <AccordionItemTrigger className="flex items-center">
                                    <span className="flex-grow">{catKey[0]}</span>
                                    <Link className="ml-auto" colorPalette="blue" onClick={handleNavigate}>
                                        <HiCursorClick />
                                        Filter Me
                                    </Link>
                                </AccordionItemTrigger>
                                <AccordionItemContent>
                                    {catKey[1]
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map((category) => (
                                            <div key={category.id}>
                                                <input
                                                    id={`cat-${category.id}`}
                                                    type={"checkbox"}
                                                    value={category.id}
                                                    onChange={updateSelectedCategories}
                                                    checked={selectedCategories.includes(category.id)}
                                                ></input>
                                                <label htmlFor={`cat-${category.id}`} className="pl-5">
                                                    {category.name}
                                                </label>
                                            </div>
                                        ))}
                                </AccordionItemContent>
                            </AccordionItem>
                        ))}
                    </AccordionRoot>
                </Stack>
            </form>
        </div>
    );
}
