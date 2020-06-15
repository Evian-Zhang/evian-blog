package top.evian_zhang.evianblog.views.writings.series

import androidx.lifecycle.ViewModel
import top.evian_zhang.evianblog.utils.articlelistview.ArticleListViewModel

class SeriesDetailsViewModel : ViewModel() {
    var detailViewModels: MutableList<ArticleListViewModel> = mutableListOf()
}