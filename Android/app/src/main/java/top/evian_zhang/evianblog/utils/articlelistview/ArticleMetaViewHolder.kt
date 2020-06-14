package top.evian_zhang.evianblog.utils.articlelistview

import android.view.View
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import java.text.SimpleDateFormat
import java.util.*

import top.evian_zhang.evianblog.api.ArticleMeta
import top.evian_zhang.evianblog.R
import top.evian_zhang.evianblog.utils.TagsAdapter

class ArticleMetaViewHolder(
    itemView: View,
    private val onArticleTitlePressed: (title: String) -> Unit,
    private val onTagNamePressed: (name: String) -> Unit,
    private val onSeriesNamePressed: (name: String) -> Unit
) : RecyclerView.ViewHolder(itemView) {
    private var articleMeta: ArticleMeta? = null

    private val dateFormatter = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())

    private val titleView: TextView = itemView.findViewById(R.id.article_meta_title)
    private val seriesView: TextView = itemView.findViewById(R.id.article_meta_series)
    private val lastReviseDateView: TextView = itemView.findViewById(R.id.article_meta_last_revise_date)
    private val tagsView: RecyclerView = itemView.findViewById(R.id.article_meta_tags)

    fun bindTo(articleMeta: ArticleMeta) {

        this.articleMeta = articleMeta
        this.titleView.text = articleMeta.title
        this.titleView.setOnClickListener {
            onArticleTitlePressed(articleMeta.title)
        }
        var hasSeriesView = false
        articleMeta.series?.let { series ->
            articleMeta.seriesIndex?.let { seriesIndex ->
                hasSeriesView = true
                this.seriesView.text = itemView.context.getString(R.string.series_text, series, seriesIndex)
                this.seriesView.setOnClickListener {
                    onSeriesNamePressed(series)
                }
            }
        }
        if (hasSeriesView) {
            this.seriesView.visibility = View.VISIBLE
        } else {
            this.seriesView.visibility = View.GONE
        }
        this.lastReviseDateView.text = this.dateFormatter.format(Date(articleMeta.lastReviseDate * 1000))
        this.tagsView.adapter =
            TagsAdapter(
                articleMeta.tags,
                onTagNamePressed
            )
        this.tagsView.layoutManager = LinearLayoutManager(itemView.context, LinearLayoutManager.HORIZONTAL, false)
    }
}
