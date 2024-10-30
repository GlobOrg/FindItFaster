import React from "react";
import {SimpleGrid, Container} from "@chakra-ui/react";
import BusinessCard from "@/components/cards/BusinessCard";
import {Business, db, Review, User} from "@/util/db";
import {notFound} from "next/navigation";
import CommentsHolder, {Comment} from "@/components/CommentsHolder";
import {auth, clerkClient} from "@clerk/nextjs/server";
import {createCommentAction, deleteCommentAction} from "@/actions/actions";

async function getImageForClerk(clerk: string): Promise<string> {
    const client = await clerkClient();
    const userInfo = await client.users.getUser(clerk);
    return userInfo.imageUrl;
}


export default async function businessPage({params}: { params: Promise<{ businessId: string }> }) {
    const pageParams = await params;
    const businessId = !isNaN(Number(pageParams.businessId)) ? Number(pageParams.businessId) : null;

    if (businessId == null) {
        notFound();
    }

    const database = db();

    const biz_businesses = await database.query<Business>(`
    SELECT
        biz_businesses.id,
        biz_businesses.name,
        biz_businesses.location,
        biz_businesses.website,
        biz_businesses.phone,
        biz_businesses.logo,
        biz_businesses.image_thumb,
        biz_businesses.image_large,
        biz_businesses.longitude,
        biz_businesses.latitude,
        biz_businesses.street_address,
        biz_businesses.zipcode,
        biz_businesses.city,
        biz_businesses.hours
    FROM biz_businesses
    WHERE biz_businesses.id = $1
    `, [businessId]);
    if (biz_businesses.rowCount != 1) {
        notFound();
    }
    console.log(biz_businesses.rows);

    const cardInfo = biz_businesses.rows;


    //const client = await clerkClient()
    const {userId} = await auth();

    const res = await db().query<Review & User & { id: number }>(/* language=PostgreSQL */
        ` SELECT review.id,
                 usr.name,
                 usr.clerk,
                 review.comment,
                 review.review
          FROM biz_reviews review
                   INNER JOIN biz_users usr ON review.user_id = usr.id`);

    const commentsMap: Array<Promise<Comment>> = res.rows.map(async result => {
        const comment: Comment = {
            id: result.id,
            image: await getImageForClerk(result.clerk),
            author: result.name,
            authorClerk: result.clerk,
            content: result.comment,
            rating: result.review
        };
        return comment;
    });

    const comments: Array<Comment> = [];
    for (let i = 0; i < commentsMap.length; i++) {
        comments.push(await commentsMap[i])
    }


    return (
        <Container maxW="80rem" centerContent>
            <SimpleGrid className="gap-4 min-w-6">
                {cardInfo.map((data) => {
                    return <BusinessCard key={data.id} business={data}/>;
                })}
                <CommentsHolder comments={comments} deleteAction={deleteCommentAction} createAction={userId ? createCommentAction : undefined}/>
            </SimpleGrid>
        </Container>
    );
}
