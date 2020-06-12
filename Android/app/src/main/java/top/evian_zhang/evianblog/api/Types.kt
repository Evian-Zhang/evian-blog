package top.evian_zhang.evianblog.api

import kotlinx.serialization.Serializable

@Serializable
data class Tag(
    val name: String,
    val articleCount: Int,
    val lastReviseDate: Long
)

@Serializable
data class Series(
    val name: String,
    val articleCount: Int,
    val lastReviseDate: Long
)

@Serializable
data class ArticleMeta(
    val title: String,
    val publishDate: Long,
    val lastReviseDate: Long,
    val tags: List<String>,
    val series: String?,
    val seriesIndex: Int?
)

@Serializable
data class Article(
    val title: String,
    val body: String,
    val publishDate: Long,
    val lastReviseDate: Long,
    val tags: List<String>,
    val series: String?,
    val seriesIndex: Int?
)

@Serializable
data class Project(
    val name: String,
    val description: String,
    val language: List<String>,
    val frameworks: List<String>,
    val url: String
)
