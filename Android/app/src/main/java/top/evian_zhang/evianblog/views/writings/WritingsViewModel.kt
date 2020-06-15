package top.evian_zhang.evianblog.views.writings

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import top.evian_zhang.evianblog.api.ArticleMetasFetcher

class WritingsViewModel : ViewModel() {
    enum class WritingsSubview {
        Article,
        Tag,
        Series
    }

    private val currentSubview: MutableLiveData<WritingsSubview> = MutableLiveData(WritingsSubview.Article)
    var programmatically = false

    fun getCurrentSubview(): LiveData<WritingsSubview> {
        return this.currentSubview
    }

    fun setCurrentSubview(subview: WritingsSubview) {
        this.currentSubview.value = subview
    }

    fun toSubview(subview: WritingsSubview) {
        this.programmatically = true
        this.currentSubview.value = subview
    }
}