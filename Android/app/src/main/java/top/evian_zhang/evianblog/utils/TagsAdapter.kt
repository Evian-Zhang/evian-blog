package top.evian_zhang.evianblog.utils

import android.view.View
import android.view.ViewGroup
import android.widget.RelativeLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

import top.evian_zhang.evianblog.R

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
