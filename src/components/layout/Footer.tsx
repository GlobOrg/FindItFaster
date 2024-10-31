import Image from "next/image";
import { Category, db } from "@/util/db";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { HStack, Stack, Text } from "@chakra-ui/react";

export default async function Footer() {
    const categories = await db().query<Category & { id: number }>(`SELECT cat.id, cat.name, (
      SELECT count(*) 
      FROM biz_business_category 
      WHERE business = cat.id) AS total 
      FROM biz_category cat 
      ORDER BY total 
      DESC LIMIT 4;`);

    const locations = await db().query(`SELECT loc.id, loc.location_name, loc.country, (
        SELECT count(*) 
        FROM biz_businesses WHERE city = loc.id) as total 
        FROM biz_locations loc 
        ORDER BY total 
        DESC LIMIT 4`);

    const players = [
        {
            id: "1",
            name: "Shane Freeder",
            git: "https://github.com/electronicboy",
            avatar: "/ShaneAvatar.webp",
        },
        {
            id: "2",
            name: "Michelle Ratcliffe",
            git: "https://github.com/michelleratcliffe",
            avatar: "/michelleAvatar.webp",
        },
        {
            id: "3",
            name: "Lewis Allen",
            git: "https://github.com/Lewis-Allen-2001",
            avatar: "/LewisAvatar.png",
        },
    ];

    return (
        <div className="grid grid-cols-4 gap-2 p-6 justify-evenly items-start bg-teal-700">
            <div>
                <Image src="/LogoTrans.png" width={100} height={40} alt="Find if Faster Logo" />
            </div>

            <div>
                <h2 className="text-black">Popular Categories:</h2>
                {categories.rows.map((category) => (
                    <p key={category.id} className="text-sm pt-3">
                        <Link href={`/search?category=${category.id}`}>{category.name}</Link>
                    </p>
                ))}
            </div>
            <div>
                <h1 className="text-black text-lg">Popular Location:</h1>
                {locations.rows.map((location) => (
                    <p key={location.id} className="text-sm pt-3">
                        <Link href={`/search?location=${location.id}`}>
                            {location.location_name}, {location.country}
                        </Link>
                    </p>
                ))}
            </div>
            <div>
                <Stack gap="8">
                    {players.map((player) => (
                        <HStack key={player.id} gap="4" className=" text-left">
                            <Avatar name={player.name} size="lg" src={player.avatar} />
                            <Stack gap="0">
                                <Text fontWeight="medium">{player.name}</Text>
                                <Link target="blank" href={player.git}>
                                    <Text color="fg" textStyle="sm">
                                        {player.git}
                                    </Text>
                                </Link>
                            </Stack>
                        </HStack>
                    ))}
                </Stack>
                <br />
            </div>
        </div>
    );
}
