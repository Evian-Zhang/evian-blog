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

class ArticleListFragment : Fragment() {
    private val args: ArticleListFragmentArgs by navArgs()

    private val onArticleTitlePressed = { title: String ->
        val navController = this.findNavController()
        navController.navigate(ArticleListFragmentDirections.actionArticleListFragmentToArticleDetailsFragment(title))
    }
    private val onTagNamePressed = { name: String ->

    }
    private val onSeriesNamePressed = { name: String ->

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

        val viewModel: ArticleTotalViewModel by activityViewModels {
            ArticleListViewModelFactory(fetcher)
        }
        viewModel.getArticles().observe(this, Observer { pagedArticleMetaList ->
            this.adapter.submitList(pagedArticleMetaList)
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