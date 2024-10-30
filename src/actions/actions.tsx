"use server";

import {db, User} from "@/util/db";
import {auth} from "@clerk/nextjs/server";
import {revalidatePath} from "next/cache";

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

export async function createCommentAction(data: FormData): Promise<boolean> {
    console.log(Object.fromEntries(data));
    return false;


}
