package top.evian_zhang.evianblog.views.writings.tag

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.activityViewModels
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.navigation.findNavController
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import androidx.viewpager2.adapter.FragmentStateAdapter
import androidx.viewpager2.widget.ViewPager2
import com.google.android.material.floatingactionbutton.FloatingActionButton
import kotlinx.coroutines.runBlocking

import top.evian_zhang.evianblog.R
import top.evian_zhang.evianblog.api.ArticleMetasFetcher
import top.evian_zhang.evianblog.api.BlogAPI
import top.evian_zhang.evianblog.api.writings.getArticlesOfTag
import top.evian_zhang.evianblog.utils.articlelistview.ArticleListFragment
import top.evian_zhang.evianblog.utils.articlelistview.ArticleListViewModel
import top.evian_zhang.evianblog.views.writings.WritingsViewModel
import top.evian_zhang.evianblog.views.writings.article.ArticleDetailViewModel
import top.evian_zhang.evianblog.views.writings.article.ArticleDetailsFragmentArgs
import top.evian_zhang.evianblog.views.writings.article.ArticleDetailsFragmentDirections

class TagDetailsFragment : Fragment() {
    private val viewModel: TagDetailsViewModel by activityViewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_tag_details, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val pager: ViewPager2 = view.findViewById(R.id.tag_details_view_pager)
        pager.adapter = TagDetailsAdapter(this, viewModel.detailViewModels)

        val args: TagDetailsFragmentArgs by navArgs()
        args.name?.let { name ->
            this.toTagDetailPage(name, pager)
        }

        val navController = view.findNavController()
        val floatingButton: FloatingActionButton = view.findViewById(R.id.writings_tag_floating_button)
        floatingButton.setOnClickListener {
            navController.navigate(TagDetailsFragmentDirections.actionTagDetailsFragmentToTagTotalFragment())
        }

        val writingsViewModel: WritingsViewModel by activityViewModels()
        writingsViewModel.getCurrentSubview().observe(viewLifecycleOwner, Observer { subview ->
            if (!writingsViewModel.programmatically) {
                val navController = this.findNavController()
                when (subview) {
                    WritingsViewModel.WritingsSubview.Article -> {
                        navController.navigate(TagDetailsFragmentDirections.actionTagDetailsFragmentToArticleListFragment())
                    }
                    WritingsViewModel.WritingsSubview.Tag -> { }
                    WritingsViewModel.WritingsSubview.Series -> TODO()
                }
            }
        })
    }

    private val blogAPI = BlogAPI()

    private fun toTagDetailPage(name: String, pager: ViewPager2) {
        val targetIndex = this.viewModel.detailViewModels.indexOfFirst { detailViewModel ->
            detailViewModel.key == name
        }
        if (targetIndex >= 0) {
            pager.currentItem = targetIndex
        } else {
            this.viewModel.detailViewModels.add(ArticleListViewModel(ArticleMetasFetcher.TagsDetail, name, this.blogAPI))
            pager.currentItem = this.viewModel.detailViewModels.count() - 1
        }
    }
}

class TagDetailsAdapter(fragment: Fragment, private val tagDetailViewModels: MutableList<ArticleListViewModel>) : FragmentStateAdapter(fragment) {
    override fun getItemCount(): Int {
        return this.tagDetailViewModels.count()
    }

    override fun createFragment(position: Int): Fragment {
        val tagDetailFragment = ArticleListFragment()
        tagDetailFragment.setViewModel(this.tagDetailViewModels[position])
        return tagDetailFragment
    }
}
