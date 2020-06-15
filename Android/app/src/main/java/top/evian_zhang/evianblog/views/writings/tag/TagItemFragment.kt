package top.evian_zhang.evianblog.views.writings.tag

import android.view.View
import android.widget.TextView
import androidx.navigation.findNavController
import androidx.recyclerview.widget.RecyclerView

import top.evian_zhang.evianblog.R
import top.evian_zhang.evianblog.api.Tag
import java.text.SimpleDateFormat
import java.util.*

class TagItemFragment(itemView: View) : RecyclerView.ViewHolder(itemView) {
    private val nameView: TextView = itemView.findViewById(R.id.tag_item_name)
    private val lastReviseDateView: TextView = itemView.findViewById(R.id.tag_item_last_revise_date)
    private val articleCountView: TextView = itemView.findViewById(R.id.tag_item_article_count)

    private val dateFormatter = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())

    fun onBind(tag: Tag) {
        this.nameView.text = tag.name
        this.nameView.setOnClickListener {
            val navController = itemView.findNavController()
            navController.navigate(TagTotalFragmentDirections.actionTagTotalFragmentToTagDetailsFragment(tag.name))
        }
        this.lastReviseDateView.text = itemView.context.getString(R.string.last_revise_date_text, this.dateFormatter.format(Date(tag.lastReviseDate * 1000)))
        this.articleCountView.text = itemView.context.getString(R.string.article_count_text, tag.articleCount)
    }
}