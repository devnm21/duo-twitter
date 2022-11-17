
exports = async  (input) => {
    const { tweetId, like } = input
    const mdb = context.services.get("mongodb-atlas");
    const db = mdb.db("test");
    const collection = db.collection("likes");
    if (like)
        await collection.insertOne({
            user: context.user.id,
            tweet: tweetId,
        })
    else {
        await collection.deleteOne({
            user: context.user.id,
            tweet: tweetId,
        })
    }
    return true
};
