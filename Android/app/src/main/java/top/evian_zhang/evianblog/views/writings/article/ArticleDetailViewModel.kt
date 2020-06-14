package top.evian_zhang.evianblog.views.writings.article

import androidx.lifecycle.*
import kotlinx.coroutines.launch

import top.evian_zhang.evianblog.api.Article
import top.evian_zhang.evianblog.api.BlogAPI
import top.evian_zhang.evianblog.api.writings.getArticle

class ArticleDetailViewModel(val title: String) : ViewModel() {
    enum class FetchStatus {
        Fetching,
        Succeeded,
        Failed
    }

    private var fetchStatus: MutableLiveData<FetchStatus> = MutableLiveData(FetchStatus.Failed)
    private var article: MutableLiveData<Article?> = MutableLiveData(null)
    private val blogAPI = BlogAPI()

    fun getFetchStatus(): LiveData<FetchStatus> {
        return this.fetchStatus
    }

    fun getArticle(): LiveData<Article?> {
        return this.article
    }

    fun fetchArticle() {
        if (this.fetchStatus.value != FetchStatus.Failed) {
            return
        }

        this.fetchStatus.value = FetchStatus.Fetching
        viewModelScope.launch {
            try {
                article.postValue(blogAPI.getArticle(title))
                fetchStatus.postValue(FetchStatus.Succeeded)
            } catch (e: Throwable) {
                fetchStatus.postValue(FetchStatus.Failed)
            }
        }
    }
}
