import { db, User } from "@/util/db";
import { notFound } from "next/navigation";
import { Card, Center, Image } from "@chakra-ui/react";
import { getImageForClerk } from "@/app/business/[businessId]/page";

export default async function ProfileId({ params }: { params: Promise<{ profileId: string }> }) {
    const profileId = (await params).profileId;

    const id = !isNaN(Number(profileId)) ? Number(profileId) : null;
    if (id == null) {
        notFound();
    }
    //const {userId} = await auth()

    const userResult = await db().query<User>("SELECT * FROM biz_users WHERE id = $1;", [id]);
    if (userResult.rowCount == 0) {
        notFound();
    }
    //const reviewsResult = await db().query('SELECT * FROM biz_reviews WHERE user_id = $1:', [id]);

    const user = userResult.rows[0];
    //const isSelf = user.clerk == userId
    //const reviews = reviewsResult.rows;

    // userInfo - userResult

    const imgUrl = await getImageForClerk(user.clerk);

    return (
        <>
            <div>
                <Center>
                    <Card.Root>
                        <Card.Header> Welcome to {user.name}&apos;s Profile</Card.Header>
                        <Card.Body>
                            <Image src={imgUrl} width={400} height={400} alt={user.name} />
                        </Card.Body>
                        <Card.Footer />
                    </Card.Root>
                </Center>
            </div>
        </>
    );
}
