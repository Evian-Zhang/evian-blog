package top.evian_zhang.evianblog.utils.articlelistview

import androidx.lifecycle.*
import androidx.paging.LivePagedListBuilder
import androidx.paging.PagedList

import top.evian_zhang.evianblog.api.ArticleMeta
import top.evian_zhang.evianblog.api.ArticleMetaDataSourceFactory

class ArticleListViewModel(private val fetcher: (pageIndex: Int, pageSize: Int) -> List<ArticleMeta>) : ViewModel() {
    private val PAGE_SZIE = 8
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

class ArticleListViewModelFactory(private val fetcher: (pageIndex: Int, pageSize: Int) -> List<ArticleMeta>) : ViewModelProvider.Factory {
    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return ArticleListViewModel(this.fetcher) as T
    }
}
