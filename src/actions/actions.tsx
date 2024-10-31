"use server";

import {db, User} from "@/util/db";
import {auth} from "@clerk/nextjs/server";
import {revalidatePath} from "next/cache";

export type ReviewFormData = {
    review: string[],
    comment: string
}

export async function deleteCommentAction(id: number): Promise<boolean> {
    const {userId} = await auth();
    if (!userId) {
        return false;
    }

    const review = await db().query<Comment & User>(/* language=PostgreSQL */ "SELECT user_id, clerk FROM biz_reviews review INNER JOIN biz_users usr ON review.user_id = usr.id WHERE review.id = $1", [id]);

    if (review.rowCount != 1) {
        return false;
    }

    if (review.rows[0].clerk === userId) {
        const res = await db().query("DELETE FROM biz_reviews WHERE id = $1", [id]);
        console.log(res);
        if (res.rowCount === 1) {
            revalidatePath("/");
            return true;
        }
    }
    return false;
}

export async function createCommentAction(id: number, data: ReviewFormData): Promise<{
    success: boolean,
    error?: string
}> {
    const {userId} = await auth();
    if (!userId) {
        return {success: false, error: "You are not authenticated"};
    }

    const res = await db().query("INSERT INTO biz_reviews (business, user_id, comment, review) VALUES ($1, (SELECT id FROM biz_users WHERE clerk = $2), $3, $4)", [id, userId, data.comment, data.review[0]]);
    if (res.rowCount === 1) {
        revalidatePath("/");
        return {success: true};
    }

    return {success: false, error: "An unknown state occurred"};
}
