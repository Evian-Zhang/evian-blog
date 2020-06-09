package top.evian_zhang.evianblog

import java.net.URL

data class Tag(
    val name: String,
    val articleCount: Int,
    val lastReviseDate: Int
)

data class Series(
    val name: String,
    val articleCount: Int,
    val lastReviseDate: Int
)

data class ArticleMeta(
    val title: String,
    val publishDate: Int,
    val lastReviseDate: Int,
    val tags: Array<String>,
    val series: String?,
    val seriesIndex: Int?
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as ArticleMeta

        if (title != other.title) return false
        if (publishDate != other.publishDate) return false
        if (lastReviseDate != other.lastReviseDate) return false
        if (!tags.contentEquals(other.tags)) return false
        if (series != other.series) return false
        if (seriesIndex != other.seriesIndex) return false

        return true
    }

    override fun hashCode(): Int {
        var result = title.hashCode()
        result = 31 * result + publishDate
        result = 31 * result + lastReviseDate
        result = 31 * result + tags.contentHashCode()
        result = 31 * result + (series?.hashCode() ?: 0)
        result = 31 * result + (seriesIndex ?: 0)
        return result
    }
}

data class Article(
    val title: String,
    val body: String,
    val publishDate: Int,
    val lastReviseDate: Int,
    val tags: Array<String>,
    val series: String?,
    val seriesIndex: Int?
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Article

        if (title != other.title) return false
        if (body != other.body) return false
        if (publishDate != other.publishDate) return false
        if (lastReviseDate != other.lastReviseDate) return false
        if (!tags.contentEquals(other.tags)) return false
        if (series != other.series) return false
        if (seriesIndex != other.seriesIndex) return false

        return true
    }

    override fun hashCode(): Int {
        var result = title.hashCode()
        result = 31 * result + body.hashCode()
        result = 31 * result + publishDate
        result = 31 * result + lastReviseDate
        result = 31 * result + tags.contentHashCode()
        result = 31 * result + (series?.hashCode() ?: 0)
        result = 31 * result + (seriesIndex ?: 0)
        return result
    }
}

data class Project(
    val name: String,
    val description: String,
    val language: Array<String>,
    val frameworks: Array<String>,
    val url: URL
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Project

        if (name != other.name) return false
        if (description != other.description) return false
        if (!language.contentEquals(other.language)) return false
        if (!frameworks.contentEquals(other.frameworks)) return false
        if (url.toString() != other.toString()) return false

        return true
    }

    override fun hashCode(): Int {
        var result = name.hashCode()
        result = 31 * result + description.hashCode()
        result = 31 * result + language.contentHashCode()
        result = 31 * result + frameworks.contentHashCode()
        result = 31 * result + url.hashCode()
        return result
    }
}
