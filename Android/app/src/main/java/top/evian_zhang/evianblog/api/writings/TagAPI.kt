package top.evian_zhang.evianblog.api.writings

import top.evian_zhang.evianblog.ArticleMeta
import top.evian_zhang.evianblog.Tag
import top.evian_zhang.evianblog.api.BlogAPI
import top.evian_zhang.evianblog.api.Endpoint

suspend fun BlogAPI.getTags(): Array<Tag> {
    return this.fetch(Endpoint.Writings.Tag.getTags)
}

suspend fun BlogAPI.getArticlesCountOfTag(name: String): Int {
    return this.fetch(Endpoint.Writings.Tag.getArticlesCountOfTag(name))
}

suspend fun BlogAPI.getArticlesOfTag(name: String, pageIndex: Int, pageSize: Int): Array<ArticleMeta> {
    return this.fetch(Endpoint.Writings.Tag.getArticlesOfTag(name, pageIndex, pageSize))
}
