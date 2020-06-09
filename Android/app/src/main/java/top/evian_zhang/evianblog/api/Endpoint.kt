package top.evian_zhang.evianblog.api

import java.net.URL
import java.net.URLEncoder

object Endpoint {
    private const val protocol = "https"
    private const val host = "evian-zhang.top"
    private const val basePath = "api/v1"
    object Writings {
        private const val writingsBasePath = "$basePath/writings"
        object Article {
            val getArticleCount = URL(protocol, host, "$writingsBasePath/articles/count")
            val getArticleMetas = { pageIndex: Int, pageSize: Int ->
                URL(protocol, host, "$writingsBasePath/articles?pageIndex=$pageIndex&pageSize=$pageSize")
            }
            val getArticle = { title: String ->
                URL(protocol, host, "$writingsBasePath/article/${URLEncoder.encode(title, "utf-8")}")
            }
            val getArticleTitles = URL(protocol, host, "$writingsBasePath/articles/titles")
        }
        object Tag {
            val getTags = URL(protocol, host, "$writingsBasePath/tags")
            val getArticlesCountOfTag = { name: String ->
                URL(protocol, host, "$writingsBasePath/tag/${URLEncoder.encode(name, "utf-8")}/count")
            }
            val getArticlesOfTag = { name: String, pageIndex: Int, pageSize: Int ->
                URL(protocol, host, "$writingsBasePath/tag/${URLEncoder.encode(name, "utf-8")}?pageIndex=$pageIndex&pageSize=$pageSize")
            }
        }
        object Series {
            val getSeries = URL(protocol, host, "$writingsBasePath/series")
            val getArticlesCountOfSeries = { name: String ->
                URL(protocol, host, "$writingsBasePath/series/${URLEncoder.encode(name, "utf-8")}/count")
            }
            val getArticlesOfSeries = { name: String, pageIndex: Int, pageSize: Int ->
                URL(protocol, host, "$writingsBasePath/series/${URLEncoder.encode(name, "utf-8")}?pageIndex=$pageIndex&pageSize=$pageSize")
            }
        }
    }
    object Projects {
        private const val projectsBasePath = "$basePath/projects"
        val getProjects = URL(protocol, host, projectsBasePath)
    }
    object Resume {
        private const val resumeBasePath = "$basePath/resume"
        val getResume = URL(protocol, host, resumeBasePath)
    }
    val imageBaseURL = URL(protocol, host, "img")
}
