package top.evian_zhang.evianblog.api

import androidx.lifecycle.MutableLiveData
import androidx.paging.DataSource
import androidx.paging.PositionalDataSource

import top.evian_zhang.evianblog.ArticleMeta

class ArticleMetaDataSource(private val fetcher: (pageIndex: Int, pageSize: Int) -> List<ArticleMeta>) : PositionalDataSource<ArticleMeta>() {
    override fun loadInitial(
        params: LoadInitialParams,
        callback: LoadInitialCallback<ArticleMeta>
    ) {
        val newArticles = this.fetcher(params.requestedStartPosition, params.requestedLoadSize)
        // This method can only be called when placeholders are disabled
        callback.onResult(newArticles, params.requestedStartPosition)
    }

    override fun loadRange(params: LoadRangeParams, callback: LoadRangeCallback<ArticleMeta>) {
        val newArticles = this.fetcher(params.startPosition, params.loadSize)
        callback.onResult(newArticles)
    }
}

class ArticleMetaDataSourceFactory(private val fetcher: (pageIndex: Int, pageSize: Int) -> List<ArticleMeta>) : DataSource.Factory<Int, ArticleMeta>() {
    private val sourceLiveData = MutableLiveData<ArticleMetaDataSource>()
    private var latestSource: ArticleMetaDataSource? = null
    override fun create(): DataSource<Int, ArticleMeta> {
        latestSource = ArticleMetaDataSource(fetcher)
        sourceLiveData.postValue(latestSource)
        return latestSource as ArticleMetaDataSource
    }
}
