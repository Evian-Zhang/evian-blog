package top.evian_zhang.evianblog.views.projects

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

import top.evian_zhang.evianblog.api.BlogAPI
import top.evian_zhang.evianblog.api.Project
import top.evian_zhang.evianblog.api.projects.getProjects

class ProjectsViewModel : ViewModel() {
    enum class FetchStatus {
        Fetching,
        Succeeded,
        Failed
    }

    private val blogAPI = BlogAPI()
    private var projects: MutableLiveData<List<Project>> = MutableLiveData(listOf())
    private var fetchStatus: MutableLiveData<FetchStatus> = MutableLiveData(FetchStatus.Failed)

    fun getProjects(): LiveData<List<Project>> {
        return this.projects
    }

    fun getFetchStatus(): LiveData<FetchStatus> {
        return this.fetchStatus
    }

    fun fetchProjects() {
        if (this.fetchStatus.value != FetchStatus.Failed) {
            return
        }
        this.fetchStatus.value = FetchStatus.Fetching

        viewModelScope.launch {
            try {
                val projects = blogAPI.getProjects()
                this@ProjectsViewModel.projects.postValue(projects)
                fetchStatus.postValue(FetchStatus.Succeeded)
                blogAPI.client.close()
            } catch (e: Throwable) {
                fetchStatus.postValue(FetchStatus.Failed)
            }
        }
    }
}
