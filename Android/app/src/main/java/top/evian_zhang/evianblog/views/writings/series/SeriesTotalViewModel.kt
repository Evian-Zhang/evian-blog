package top.evian_zhang.evianblog.views.writings.series

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

import top.evian_zhang.evianblog.api.BlogAPI
import top.evian_zhang.evianblog.api.Series
import top.evian_zhang.evianblog.api.writings.getSeries

class SeriesTotalViewModel : ViewModel() {
    enum class FetchStatus {
        Fetching,
        Succeeded,
        Failed
    }

    private val blogAPI = BlogAPI()
    private var series: MutableLiveData<List<Series>> = MutableLiveData(listOf())
    private var fetchStatus: MutableLiveData<FetchStatus> = MutableLiveData(FetchStatus.Failed)

    fun getSeries(): LiveData<List<Series>> {
        return this.series
    }

    fun getFetchStatus(): LiveData<FetchStatus> {
        return this.fetchStatus
    }

    fun fetchSeries() {
        if (this.fetchStatus.value != FetchStatus.Failed) {
            return
        }
        this.fetchStatus.value = FetchStatus.Fetching

        viewModelScope.launch {
            try {
                val series = blogAPI.getSeries()
                this@SeriesTotalViewModel.series.postValue(series)
                fetchStatus.postValue(FetchStatus.Succeeded)
                blogAPI.client.close()
            } catch (e: Throwable) {
                fetchStatus.postValue(FetchStatus.Failed)
            }
        }
    }
}
