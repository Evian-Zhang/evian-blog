package top.evian_zhang.evianblog.views.writings.article

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import top.evian_zhang.evianblog.R
import top.evian_zhang.evianblog.ArticleMeta
import top.evian_zhang.evianblog.api.BlogAPI
import top.evian_zhang.evianblog.api.writings.getArticleMetas

class ArticleTotalFragment : Fragment() {
    private var articles: MutableList<ArticleMeta> = mutableListOf()
    private var nextPageIndex = 0
    private val PAGE_SIZE = 10
    private val blogAPI = BlogAPI()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    private fun fetchArticles() {
        this.blogAPI.getArticleMetas(this.nextPageIndex, this.PAGE_SIZE)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_article_total, container, false)
    }
}