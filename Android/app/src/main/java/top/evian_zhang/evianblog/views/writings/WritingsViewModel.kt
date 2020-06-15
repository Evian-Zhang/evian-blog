package top.evian_zhang.evianblog.views.writings

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class WritingsViewModel : ViewModel() {
    enum class WritingsSubview {
        Article,
        Tag,
        Series
    }

    data class SubviewState(
        val subview: WritingsSubview,
        // To show the writings subview tab is selected by user, or by changing selection programmatically
        val programmatically: Boolean
    )

    private val currentSubview: MutableLiveData<SubviewState> = MutableLiveData(SubviewState(WritingsSubview.Article, false))

    fun getCurrentSubview(): LiveData<SubviewState> {
        return this.currentSubview
    }

    fun toSubviewProgrammatically(subview: WritingsSubview) {
        this.currentSubview.value = SubviewState(subview, true)
    }

    fun toSubviewManually(subview: WritingsSubview) {
        this.currentSubview.value = SubviewState(subview, false)
    }
}