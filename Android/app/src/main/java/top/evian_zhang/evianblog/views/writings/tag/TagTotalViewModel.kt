package top.evian_zhang.evianblog.views.writings.tag

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

import top.evian_zhang.evianblog.api.BlogAPI
import top.evian_zhang.evianblog.api.Tag
import top.evian_zhang.evianblog.api.writings.getTags

class TagTotalViewModel : ViewModel() {
    enum class FetchStatus {
        Fetching,
        Succeeded,
        Failed
    }

    private val blogAPI = BlogAPI()
    private var tags: MutableLiveData<List<Tag>> = MutableLiveData(listOf())
    private var fetchStatus: MutableLiveData<FetchStatus> = MutableLiveData(FetchStatus.Failed)

    fun getTags(): LiveData<List<Tag>> {
        return this.tags
    }

    fun getFetchStatus(): LiveData<FetchStatus> {
        return this.fetchStatus
    }

    fun fetchTags() {
        if (this.fetchStatus.value != FetchStatus.Failed) {
            return
        }
        this.fetchStatus.value = FetchStatus.Fetching

        viewModelScope.launch {
            try {
                val tags = blogAPI.getTags()
                this@TagTotalViewModel.tags.postValue(tags)
                fetchStatus.postValue(FetchStatus.Succeeded)
            } catch (e: Throwable) {
                fetchStatus.postValue(FetchStatus.Failed)
            }
        }
    }
}
