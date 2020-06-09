package top.evian_zhang.evianblog.api

import java.net.URL

import io.ktor.client.HttpClient
import io.ktor.client.engine.android.Android
import io.ktor.client.features.json.JsonFeature
import io.ktor.client.features.json.serializer.KotlinxSerializer
import io.ktor.client.request.get

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