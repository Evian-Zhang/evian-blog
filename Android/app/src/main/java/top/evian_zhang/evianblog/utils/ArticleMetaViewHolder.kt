package top.evian_zhang.evianblog.utils

import android.view.View
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

import top.evian_zhang.evianblog.ArticleMeta
import top.evian_zhang.evianblog.R

class ArticleMetaViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
    private var articleMeta: ArticleMeta? = null

    private val titleView: TextView = itemView.findViewById(R.id.article_meta_title)

    fun bindTo(articleMeta: ArticleMeta) {
        this.articleMeta = articleMeta
        this.titleView.text = this.articleMeta!!.title
    }
}