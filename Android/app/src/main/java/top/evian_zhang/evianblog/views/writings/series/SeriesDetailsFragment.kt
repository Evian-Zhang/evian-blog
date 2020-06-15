package top.evian_zhang.evianblog.views.writings.series

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Observer
import androidx.navigation.findNavController
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import androidx.viewpager2.adapter.FragmentStateAdapter
import androidx.viewpager2.widget.ViewPager2
import com.google.android.material.floatingactionbutton.FloatingActionButton

import top.evian_zhang.evianblog.R
import top.evian_zhang.evianblog.api.ArticleMetasFetcher
import top.evian_zhang.evianblog.api.BlogAPI
import top.evian_zhang.evianblog.utils.articlelistview.ArticleListFragment
import top.evian_zhang.evianblog.utils.articlelistview.ArticleListViewModel
import top.evian_zhang.evianblog.views.writings.WritingsViewModel

class SeriesDetailsFragment : Fragment() {
    private val viewModel: SeriesDetailsViewModel by activityViewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_series_details, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val pager: ViewPager2 = view.findViewById(R.id.series_details_view_pager)
        pager.adapter = SeriesDetailsAdapter(this, viewModel.detailViewModels)

        val args: SeriesDetailsFragmentArgs by navArgs()
        args.name?.let { name ->
            this.toSeriesDetailPage(name, pager)
        }

        val navController = view.findNavController()
        val floatingButton: FloatingActionButton = view.findViewById(R.id.writings_series_floating_button)
        floatingButton.setOnClickListener {
            navController.navigate(SeriesDetailsFragmentDirections.actionSeriesDetailsFragmentToSeriesTotalFragment())
        }

        val writingsViewModel: WritingsViewModel by activityViewModels()
        writingsViewModel.getCurrentSubview().observe(viewLifecycleOwner, Observer { subviewState ->
            if (!subviewState.programmatically) {
                val navController = this.findNavController()
                when (subviewState.subview) {
                    WritingsViewModel.WritingsSubview.Article -> {
                        navController.navigate(SeriesDetailsFragmentDirections.actionSeriesDetailsFragmentToArticleListFragment())
                    }
                    WritingsViewModel.WritingsSubview.Tag -> {
                        navController.navigate(SeriesDetailsFragmentDirections.actionSeriesDetailsFragmentToTagTotalFragment())
                    }
                    WritingsViewModel.WritingsSubview.Series -> { }
                }
            }
        })
    }

    private val blogAPI = BlogAPI()

    private fun toSeriesDetailPage(name: String, pager: ViewPager2) {
        val targetIndex = this.viewModel.detailViewModels.indexOfFirst { detailViewModel ->
            detailViewModel.key == name
        }
        if (targetIndex >= 0) {
            pager.currentItem = targetIndex
        } else {
            this.viewModel.detailViewModels.add(ArticleListViewModel(ArticleMetasFetcher.SeriesDetail, name, this.blogAPI))
            pager.currentItem = this.viewModel.detailViewModels.count() - 1
        }
    }
}

class SeriesDetailsAdapter(fragment: Fragment, private val seriesDetailViewModels: MutableList<ArticleListViewModel>) : FragmentStateAdapter(fragment) {
    override fun getItemCount(): Int {
        return this.seriesDetailViewModels.count()
    }

    override fun createFragment(position: Int): Fragment {
        val seriesDetailFragment = ArticleListFragment()
        seriesDetailFragment.setViewModel(this.seriesDetailViewModels[position])
        return seriesDetailFragment
    }
}
