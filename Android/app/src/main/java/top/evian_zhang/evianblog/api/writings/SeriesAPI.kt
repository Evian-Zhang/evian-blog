package top.evian_zhang.evianblog.api.writings

import top.evian_zhang.evianblog.ArticleMeta
import top.evian_zhang.evianblog.Series
import top.evian_zhang.evianblog.api.BlogAPI
import top.evian_zhang.evianblog.api.Endpoint

suspend fun BlogAPI.getSeries(): Array<Series> {
    return this.fetch(Endpoint.Writings.Series.getSeries)
}

suspend fun BlogAPI.getArticlesCountOfSeries(name: String): Int {
    return this.fetch(Endpoint.Writings.Series.getArticlesCountOfSeries(name))
}

suspend fun BlogAPI.getArticlesOfSeries(name: String, pageIndex: Int, pageSize: Int): Array<ArticleMeta> {
    return this.fetch(Endpoint.Writings.Series.getArticlesOfSeries(name, pageIndex, pageSize))
}
