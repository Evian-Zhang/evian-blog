package top.evian_zhang.evianblog.utils.articlelistview

import android.view.View
import android.view.ViewGroup
import android.widget.RelativeLayout
import android.widget.TextView
import androidx.navigation.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

import top.evian_zhang.evianblog.api.ArticleMeta
import top.evian_zhang.evianblog.R
import java.text.SimpleDateFormat
import java.util.*

class ArticleMetaViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
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
            val navController = itemView.findNavController()
        }
        var hasSeriesView = false
        articleMeta.series?.let { series ->
            articleMeta.seriesIndex?.let { seriesIndex ->
                hasSeriesView = true
                this.seriesView.text = itemView.context.getString(R.string.series_text, series, seriesIndex)
                this.seriesView.setOnClickListener {

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
                articleMeta.tags
            )
        this.tagsView.layoutManager = LinearLayoutManager(itemView.context, LinearLayoutManager.HORIZONTAL, false)
    }
}

class TagsAdapter(private val tags: List<String>) : RecyclerView.Adapter<TagsAdapter.ViewHolder>() {
    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun onBind(tag: String) {
            val textView = this.itemView as TextView
            textView.text = tag
            textView.setOnClickListener {

            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val textView = TextView(parent.context)
        val layoutParams = RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT)
        layoutParams.setMargins(5, 0, 5, 0)
        textView.layoutParams = layoutParams
        textView.setTextAppearance(R.style.TextAppearance_AppCompat_Subhead)
        return ViewHolder(
            textView
        )
    }

    override fun getItemCount(): Int {
        return this.tags.count()
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.onBind(this.tags[position])
    }
}
