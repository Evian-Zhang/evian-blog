package top.evian_zhang.evianblog.utils.articlelistview

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.paging.PagedListAdapter
import androidx.recyclerview.widget.DiffUtil

import top.evian_zhang.evianblog.api.ArticleMeta
import top.evian_zhang.evianblog.R

class ArticleMetaAdapter(
    private val onArticleTitlePressed: (title: String) -> Unit,
    private val onTagNamePressed: (name: String) -> Unit,
    private val onSeriesNamePressed: (name: String) -> Unit
) : PagedListAdapter<ArticleMeta, ArticleMetaViewHolder>(
    object: DiffUtil.ItemCallback<ArticleMeta>() {
        override fun areItemsTheSame(oldItem: ArticleMeta, newItem: ArticleMeta): Boolean {
            return oldItem.title == newItem.title
        }

        override fun areContentsTheSame(oldItem: ArticleMeta, newItem: ArticleMeta): Boolean {
            return oldItem == newItem
        }
    }
) {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ArticleMetaViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.fragment_article_item, parent, false)
        return ArticleMetaViewHolder(
            view,
            this.onArticleTitlePressed,
            this.onTagNamePressed,
            this.onSeriesNamePressed
        )
    }

    override fun onBindViewHolder(holder: ArticleMetaViewHolder, position: Int) {
        val articleMeta = getItem(position)
        if (articleMeta != null) {
            holder.bindTo(articleMeta)
        }
    }
}