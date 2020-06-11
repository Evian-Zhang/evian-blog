package top.evian_zhang.evianblog.views.writings.article

import androidx.lifecycle.*
import androidx.paging.LivePagedListBuilder
import androidx.paging.PagedList
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

import top.evian_zhang.evianblog.ArticleMeta
import top.evian_zhang.evianblog.api.ArticleMetaDataSource
import top.evian_zhang.evianblog.api.ArticleMetaDataSourceFactory
import top.evian_zhang.evianblog.api.BlogAPI
import top.evian_zhang.evianblog.api.writings.getArticleMetas

class ArticleTotalViewModel : ViewModel() {
    enum class FetchingStatus {
        FETCHING,
        SUCCEEDED,
        FAILED
    }

    private val PAGE_SZIE = 10
    private val articles: LiveData<PagedList<ArticleMeta>> = LivePagedListBuilder(
        ArticleMetaDataSourceFactory { pageIndex, pageSize ->
            runBlocking {
                blogAPI.getArticleMetas(pageIndex, pageSize)
            }
        },
        PagedList.Config.Builder()
            .setPageSize(this.PAGE_SZIE)
            .setEnablePlaceholders(false)
            .setPrefetchDistance(2)
            .setInitialLoadSizeHint(PAGE_SZIE)
            .build()
    )
        .setInitialLoadKey(0)
        .build()
    private val blogAPI: BlogAPI = BlogAPI()

    fun getArticles(): LiveData<PagedList<ArticleMeta>> {
        return this.articles
    }

//    private fun fetchArticles() {
//        if (this.fetchingStatus.value == FetchingStatus.FETCHING || this.reachEnd) {
//            return
//        }
//
//        viewModelScope.launch {
//            try {
//                val newArticles = blogAPI.getArticleMetas(nextPageIndex, PAGE_SZIE)
//                reachEnd = newArticles.isEmpty()
//                if (newArticles.isNotEmpty()) {
//                    nextPageIndex += 1
//                    articles.postValue(articles.value?.plus(newArticles))
//                }
//                fetchingStatus.postValue(FetchingStatus.SUCCEEDED)
//            } catch (e: Exception) {
//                fetchingStatus.postValue(FetchingStatus.FAILED)
//            }
//        }
//    }
}
