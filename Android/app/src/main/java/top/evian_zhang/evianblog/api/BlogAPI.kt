package top.evian_zhang.evianblog.api

import java.net.URL

import io.ktor.client.HttpClient
import io.ktor.client.engine.android.Android
import io.ktor.client.features.json.JsonFeature
import io.ktor.client.features.json.serializer.KotlinxSerializer
import io.ktor.client.request.get
import kotlinx.coroutines.runBlocking
import top.evian_zhang.evianblog.api.writings.getArticleMetas
import top.evian_zhang.evianblog.api.writings.getArticlesOfSeries
import top.evian_zhang.evianblog.api.writings.getArticlesOfTag

class BlogAPI {

    // need client.close() to release resources
    val client = HttpClient(Android) {
        install(JsonFeature) {
            serializer = KotlinxSerializer()
        }
    }

    suspend inline fun <reified T> fetch(url: URL): T {
        return this.client.get(url)
    }
}

enum class ArticleMetasFetcher {
    ArticleTotal,
    TagsDetail,
    SeriesDetail;

    fun getFetcher(key: String, blogAPI: BlogAPI): (pageIndex: Int, pageSize: Int) -> List<ArticleMeta> {
        return { pageIndex: Int, pageSize: Int ->
            runBlocking {
                when (this@ArticleMetasFetcher) {
                    ArticleTotal -> blogAPI.getArticleMetas(pageIndex, pageSize)
                    TagsDetail -> blogAPI.getArticlesOfTag(key, pageIndex, pageSize)
                    SeriesDetail -> blogAPI.getArticlesOfSeries(key, pageIndex, pageSize)
                }
            }
        }
    }
}
