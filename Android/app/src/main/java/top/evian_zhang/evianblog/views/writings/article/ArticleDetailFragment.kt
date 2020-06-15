package top.evian_zhang.evianblog.views.writings.article

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import androidx.lifecycle.Observer
import androidx.navigation.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import java.text.SimpleDateFormat
import java.util.*

import top.evian_zhang.evianblog.R
import top.evian_zhang.evianblog.utils.TagsAdapter

class ArticleDetailFragment(private val title: String, private val viewModel: ArticleDetailViewModel) : Fragment() {
    private val dateFormatter = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_article_detail, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val seriesView: TextView = view.findViewById(R.id.article_detail_series)
        val titleView: TextView = view.findViewById(R.id.article_detail_title)
        val publishDateView: TextView = view.findViewById(R.id.article_detail_publish_date)
        val lastReviseDateView: TextView = view.findViewById(R.id.article_detail_last_revise_date)
        val tagsView: RecyclerView = view.findViewById(R.id.article_detail_tags)
        val bodyView: TextView = view.findViewById(R.id.article_detail_body)

        val fetchingView: LinearLayout = view.findViewById(R.id.article_detail_fetching)
        val failedView: LinearLayout = view.findViewById(R.id.article_detail_failure)
        val succeededView: ScrollView = view.findViewById(R.id.article_detail_success)

        viewModel.getFetchStatus().observe(viewLifecycleOwner, Observer { fetchStatus ->
            when (fetchStatus) {
                ArticleDetailViewModel.FetchStatus.Fetching -> {
                    failedView.visibility = View.GONE
                    succeededView.visibility = View.GONE
                    fetchingView.visibility = View.VISIBLE
                }
                ArticleDetailViewModel.FetchStatus.Succeeded -> {
                    fetchingView.visibility = View.GONE
                    failedView.visibility = View.GONE
                    succeededView.visibility = View.VISIBLE
                }
                ArticleDetailViewModel.FetchStatus.Failed -> {
                    fetchingView.visibility = View.GONE
                    succeededView.visibility = View.GONE
                    failedView.visibility = View.VISIBLE
                }
            }
        })

        val failedText: TextView = view.findViewById(R.id.article_detail_fail_text)
        failedText.setOnClickListener {
            viewModel.fetchArticle()
        }

        val onTagNamePressed = { name: String ->
            val navController = view.findNavController()
            navController.navigate(ArticleDetailsFragmentDirections.actionArticleDetailsFragmentToTagDetailsFragment(name))
        }

        viewModel.getArticle().observe(viewLifecycleOwner, Observer { article ->
            article?.let { article ->
                var hasSeriesView = false
                article.series?.let { series ->
                    article.seriesIndex?.let { seriesIndex ->
                        hasSeriesView = true
                        seriesView.text = view.context.getString(R.string.series_text, series, seriesIndex)
                        seriesView.setOnClickListener {

                        }
                    }
                }
                if (hasSeriesView) {
                    seriesView.visibility = View.VISIBLE
                } else {
                    seriesView.visibility = View.GONE
                }

                titleView.text = article.title
                publishDateView.text = dateFormatter.format(Date(article.publishDate * 1000))
                lastReviseDateView.text = dateFormatter.format(Date(article.lastReviseDate * 1000))
                tagsView.adapter = TagsAdapter(article.tags, onTagNamePressed)
                tagsView.layoutManager = LinearLayoutManager(view.context, LinearLayoutManager.HORIZONTAL, false)
                bodyView.text = article.body
            }
        })

        viewModel.fetchArticle()
    }
}