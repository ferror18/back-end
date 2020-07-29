module.exports = {
    makeArticleFrom : function (article) {
        const {url, board_id, title, thumbnail, author, host} = article
        return {
            url: url,
            thumbnail: thumbnail || null,
            title: title || "Generic title",
            author: author || "Generic author",
            host: title || "Generic host",
            board_id: board_id
        }
    }
}