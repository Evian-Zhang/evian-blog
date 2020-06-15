package top.evian_zhang.evianblog.views.resume

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

import top.evian_zhang.evianblog.api.BlogAPI
import top.evian_zhang.evianblog.api.resume.getResume

class ResumeViewModel : ViewModel() {
    enum class FetchStatus {
        Fetching,
        Succeeded,
        Failed
    }

    private val blogAPI = BlogAPI()
    private var resume: MutableLiveData<String> = MutableLiveData(String())
    private var fetchStatus: MutableLiveData<FetchStatus> = MutableLiveData(FetchStatus.Failed)

    fun getResume(): LiveData<String> {
        return this.resume
    }

    fun getFetchStatus(): LiveData<FetchStatus> {
        return this.fetchStatus
    }

    fun fetchResume() {
        if (this.fetchStatus.value != FetchStatus.Failed) {
            return
        }
        this.fetchStatus.value = FetchStatus.Fetching

        viewModelScope.launch {
            try {
                val resume = blogAPI.getResume()
                this@ResumeViewModel.resume.postValue(resume)
                fetchStatus.postValue(FetchStatus.Succeeded)
                blogAPI.client.close()
            } catch (e: Throwable) {
                fetchStatus.postValue(FetchStatus.Failed)
            }
        }
    }
}