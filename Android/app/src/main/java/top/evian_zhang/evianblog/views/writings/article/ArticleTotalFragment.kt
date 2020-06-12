package top.evian_zhang.evianblog.views.writings.article

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

import top.evian_zhang.evianblog.R
import top.evian_zhang.evianblog.utils.ArticleMetaAdapter

class ArticleTotalFragment : Fragment() {
    private val adapter = ArticleMetaAdapter();
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val viewModel: ArticleTotalViewModel by viewModels()
//        model.getFetchingStatus().observe(this, Observer { fetchingStatus ->
//            when (fetchingStatus) {
//                ArticleTotalViewModel.FetchingStatus.FETCHING -> {
//
//                }
//                ArticleTotalViewModel.FetchingStatus.SUCCEEDED ->
//                ArticleTotalViewModel.FetchingStatus.FAILED ->
//            }
//        })
//        model.getArticles().observe(this, Observer { articles ->
//
//        })
        viewModel.getArticles().observe(this, Observer { pagedArticleMetaList ->
            this.adapter.submitList(pagedArticleMetaList)
        })
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_article_total, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val recyclerView = view.findViewById<RecyclerView>(R.id.article_list)
        recyclerView.adapter = this.adapter
        // see https://stackoverflow.com/a/35802948/10005095
        recyclerView.layoutManager = LinearLayoutManager(activity)
    }
}