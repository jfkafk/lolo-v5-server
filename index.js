import RSSParser from "rss-parser";
import cors from "cors";
import express from "express"

const feedURL = "https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss";

const parser = new RSSParser( {
    customFields: {
        // to fetch media:content along with image.
        item: [
            [ 'media:content', "media" ]
        ]
    }
});
let articles = [];

const parse = async url => {
    const feed = await parser.parseURL(url);

    console.log(feed.title);

    feed.items.forEach(item => {
        articles.push({ item })
    })

}

parse(feedURL);

let app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send(articles);
})

const server = app.listen("3444", () => {
    console.log("app is listening at http://localhost:4000");
})

export default server;
