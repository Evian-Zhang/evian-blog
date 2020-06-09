package top.evian_zhang.evianblog.api.writings

import top.evian_zhang.evianblog.Article
import top.evian_zhang.evianblog.ArticleMeta
import top.evian_zhang.evianblog.api.BlogAPI
import top.evian_zhang.evianblog.api.Endpoint

suspend fun BlogAPI.getArticlesCount(): Int {
    return this.fetch(Endpoint.Writings.Article.getArticleCount)
}

suspend fun BlogAPI.getArticleMetas(pageIndex: Int, pageSize: Int): Array<ArticleMeta> {
    return this.fetch(Endpoint.Writings.Article.getArticleMetas(pageIndex, pageSize))
}

suspend fun BlogAPI.getArticle(title: String): Article {
    return this.fetch(Endpoint.Writings.Article.getArticle(title))
}

suspend fun BlogAPI.getArticleTitles(): Array<String> {
    return this.fetch(Endpoint.Writings.Article.getArticleTitles)
}
