package top.evian_zhang.evianblog.utils.articlelistview

import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

import top.evian_zhang.evianblog.R
import top.evian_zhang.evianblog.api.BlogAPI
import top.evian_zhang.evianblog.views.writings.WritingsViewModel

class ArticleListFragment : Fragment() {
    private val args: ArticleListFragmentArgs by navArgs()

    private val onArticleTitlePressed = { title: String ->
        val viewModel: WritingsViewModel by activityViewModels()
        viewModel.toSubview(WritingsViewModel.WritingsSubview.Article)
        val navController = this.findNavController()
        navController.navigate(ArticleListFragmentDirections.actionArticleListFragmentToArticleDetailsFragment(title))
    }
    private val onTagNamePressed = { name: String ->
        val viewModel: WritingsViewModel by activityViewModels()
        viewModel.toSubview(WritingsViewModel.WritingsSubview.Tag)

    }
    private val onSeriesNamePressed = { name: String ->
        val viewModel: WritingsViewModel by activityViewModels()
        viewModel.toSubview(WritingsViewModel.WritingsSubview.Series)

    }

    private val adapter = ArticleMetaAdapter(this.onArticleTitlePressed, onTagNamePressed, onSeriesNamePressed)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_article_list, container, false)
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)

        val fetcher = this.args.fetcherType.getFetcher(this.args.key, BlogAPI())

        val viewModel: ArticleListViewModel by activityViewModels {
            ArticleListViewModelFactory(fetcher)
        }
        viewModel.getArticles().observe(this, Observer { pagedArticleMetaList ->
            this.adapter.submitList(pagedArticleMetaList)
        })


        val writingsViewModel: WritingsViewModel by activityViewModels()
        writingsViewModel.getCurrentSubview().observe(this, Observer { subview ->
            if (!writingsViewModel.programmatically && !subview.isCompatibleWithArticleFetcher(this.args.fetcherType)) {
                val navController = this.findNavController()
                when (subview) {
                    WritingsViewModel.WritingsSubview.Article -> {
                        navController.navigate(ArticleListFragmentDirections.actionArticleListFragmentSelf())
                    }
                    WritingsViewModel.WritingsSubview.Tag -> {
                        navController.navigate(ArticleListFragmentDirections.actionArticleListFragmentToTagTotalFragment())
                    }
                    WritingsViewModel.WritingsSubview.Series -> {

                    }
                }
            }
        })
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val recyclerView = view.findViewById<RecyclerView>(R.id.article_list)
        recyclerView.adapter = this.adapter
        // see https://stackoverflow.com/a/35802948/10005095
        recyclerView.layoutManager = LinearLayoutManager(activity)
    }
}