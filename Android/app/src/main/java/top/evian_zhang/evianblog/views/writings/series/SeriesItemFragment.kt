package top.evian_zhang.evianblog.views.writings.series

import android.view.View
import android.widget.TextView
import androidx.navigation.findNavController
import androidx.recyclerview.widget.RecyclerView
import java.text.SimpleDateFormat
import java.util.*

import top.evian_zhang.evianblog.R
import top.evian_zhang.evianblog.api.Series

class SeriesItemFragment(itemView: View) : RecyclerView.ViewHolder(itemView) {
    private val nameView: TextView = itemView.findViewById(R.id.series_title)
    private val lastReviseDateView: TextView = itemView.findViewById(R.id.series_last_revise_date)
    private val articleCountView: TextView = itemView.findViewById(R.id.series_article_count)

    private val dateFormatter = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())

    fun onBind(series: Series) {
        this.nameView.text = series.name
        this.nameView.setOnClickListener {
            val navController = itemView.findNavController()
            navController.navigate(SeriesTotalFragmentDirections.actionSeriesTotalFragmentToSeriesDetailsFragment(series.name))
        }
        this.lastReviseDateView.text = itemView.context.getString(
            R.string.last_revise_date_text, this.dateFormatter.format(
                Date(series.lastReviseDate * 1000)
            ))
        this.articleCountView.text = itemView.context.getString(R.string.article_count_text, series.articleCount)
    }
}