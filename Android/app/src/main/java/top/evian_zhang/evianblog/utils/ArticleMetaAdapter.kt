package top.evian_zhang.evianblog.utils

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.paging.PagedListAdapter
import androidx.recyclerview.widget.DiffUtil
import kotlinx.android.synthetic.main.fragment_article_item.view.*
import top.evian_zhang.evianblog.ArticleMeta
import top.evian_zhang.evianblog.R

class ArticleMetaAdapter : PagedListAdapter<ArticleMeta, ArticleMetaViewHolder>(
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
        return ArticleMetaViewHolder(view)
    }

    override fun onBindViewHolder(holder: ArticleMetaViewHolder, position: Int) {
        val articleMeta = getItem(position)
        if (articleMeta != null) {
            holder.bindTo(articleMeta)
        }
    }
}