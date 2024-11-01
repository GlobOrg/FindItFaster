import { auth } from "@clerk/nextjs/server";
import { db } from "@/util/db";
import { notFound, redirect } from "next/navigation";
import { Card } from "@chakra-ui/react";

export default async function ProfilePageRedirector() {
    const { userId } = await auth();

    if (userId) {
        const queryRes = await db().query<{ id: number }>(
            /* language=PostgreSQL */ "SELECT id FROM biz_users WHERE clerk = $1",
            [userId]
        );
        if (queryRes.rows.length > 0) {
            redirect(`/profile/${queryRes.rows[0].id}`);
        } else {
            notFound();
        }
    }
    return (
        <>
            <div>
                <Card.Root>
                    <Card.Header> Welcome {userId}</Card.Header>
                    <Card.Body />
                    <Card.Footer />
                </Card.Root>
            </div>
        </>
    );
}
