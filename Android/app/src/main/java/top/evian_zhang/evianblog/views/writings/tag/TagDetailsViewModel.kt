package top.evian_zhang.evianblog.views.writings.tag

import androidx.lifecycle.ViewModel
import top.evian_zhang.evianblog.utils.articlelistview.ArticleListViewModel

class TagDetailsViewModel : ViewModel() {
    var detailViewModels: MutableList<ArticleListViewModel> = mutableListOf()
}