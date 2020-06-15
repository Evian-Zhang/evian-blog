package top.evian_zhang.evianblog.utils.articlelistview

import androidx.lifecycle.*
import androidx.paging.LivePagedListBuilder
import androidx.paging.PagedList

import top.evian_zhang.evianblog.api.ArticleMeta
import top.evian_zhang.evianblog.api.ArticleMetaDataSourceFactory
import top.evian_zhang.evianblog.api.ArticleMetasFetcher
import top.evian_zhang.evianblog.api.BlogAPI

class ArticleListViewModel(
    val fetcherType: ArticleMetasFetcher,
    val key: String,
    private val blogAPI: BlogAPI
) : ViewModel() {
    private val PAGE_SZIE = 8
    private val fetcher = this.fetcherType.getFetcher(this.key, this.blogAPI)
    // BUG: if the fetched articles is fewer than initial load size, then unexpected behavior will show
    private val articles: LiveData<PagedList<ArticleMeta>> = LivePagedListBuilder(
        ArticleMetaDataSourceFactory(this.fetcher),
        PagedList.Config.Builder()
            .setPageSize(this.PAGE_SZIE)
            .setEnablePlaceholders(false)
            .setPrefetchDistance(2)
            .setInitialLoadSizeHint(this.PAGE_SZIE)
            .build()
    )
        .setInitialLoadKey(0)
        .build()

    fun getArticles(): LiveData<PagedList<ArticleMeta>> {
        return this.articles
    }
}

class ArticleListViewModelFactory(
    val fetcherType: ArticleMetasFetcher,
    private val key: String,
    private val blogAPI: BlogAPI
) : ViewModelProvider.Factory {
    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return ArticleListViewModel(this.fetcherType, this.key, this.blogAPI) as T
    }
}
