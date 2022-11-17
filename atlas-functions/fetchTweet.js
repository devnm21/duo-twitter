
exports = async () => {
    const mdb = context.services.get("mongodb-atlas");
    const db = mdb.db("test");
    const tweets = db.collection("tweets");
    const userId = context.user.id
    const res = await tweets.aggregate(
        [
            {
                $lookup: {
                    from: "users",
                    foreignField: "uid",
                    localField: "author",
                    as: "author",
                }
            },
            {
                $lookup: {
                    from: "likes",
                    as: "liked",
                    let: { tweetId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$user", userId]},
                                        { $eq: ["$tweet", "$$tweetId"]}
                                    ]
                                }
                            }
                        }

                    ]
                }
            },
            {
                $addFields: {
                    isLiked: {
                        $size: "$liked",
                    }
                }
            },

            {
                $unset: ["liked"]

            },
            {
                $project: {
                    content: 1,
                    author: {
                        $arrayElemAt: ["$author", 0]
                    },
                    isLiked: {
                        $convert: {
                            input: "$isLiked",
                            to: "bool",
                            onNull: false,
                        }
                    }
                }
            },

        ]
    )
    const tweetsv2 = []
    for await (const doc of res) {
        console.log(JSON.stringify(doc))
        tweetsv2.push(doc);
    }
    // console.log(JSON.stringify(res), Object.keys(res).forEach(key => console.log(key, ':', res[key])) , await res.toArray() )
    return tweetsv2
};
