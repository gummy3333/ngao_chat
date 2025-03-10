"use server"

import clientPromise from "@/database/mongodb";
import { ObjectId } from "mongodb";


export async function GET(request, { params }) {
  try {
    const db = (await clientPromise).db(process.env.MONGO_DB);
    const collection = db.collection("users");

    // convert id string to ObjectId
    const userId = new ObjectId(params.user_id);
    const user = await collection.findOne({ _id: userId });

    return Response.json(user);
  } catch (error) {
    console.error("Database connection error:", error);
    return Response.json({ error: "Failed to connect to database" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const db = (await clientPromise).db(process.env.MONGO_DB);
    const collection = db.collection("comments");

    await collection.updateOne(
        { comment_id: parseInt((await params).comment_id) },
        body.action === 'like' 
            ? { $addToSet: { like: body.user_id } }
            : body.action === 'unlike' 
                ? { $pull: { like: body.user_id } } 
                : {}
    );

    return Response.json({}, { status: 200 });
  } catch (error) {
    console.error("Database connection error:", error);
    return Response.json({ error: "Failed to connect to database" }, { status: 500 });
  }
}