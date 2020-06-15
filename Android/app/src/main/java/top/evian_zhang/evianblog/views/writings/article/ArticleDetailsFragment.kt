package top.evian_zhang.evianblog.views.writings.article

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
import top.evian_zhang.evianblog.api.BlogAPI
import top.evian_zhang.evianblog.views.writings.WritingsViewModel

class ArticleDetailsFragment : Fragment() {
    private val viewModel: ArticleDetailsViewModel by activityViewModels()
    private val args: ArticleDetailsFragmentArgs by navArgs()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_article_details, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val pager: ViewPager2 = view.findViewById(R.id.article_details_view_pager)
        pager.adapter = ArticleDetailsAdapter(this, viewModel.detailViewModels)

        this.args.title?.let { title ->
            toArticleDetailPage(pager, title)
        }

        val navController = view.findNavController()
        val floatingButton: FloatingActionButton = view.findViewById(R.id.writings_article_floating_button)
        floatingButton.setOnClickListener {
            navController.navigate(ArticleDetailsFragmentDirections.actionArticleDetailsFragmentToArticleListFragment())
        }

        val writingsViewModel: WritingsViewModel by activityViewModels()
        writingsViewModel.getCurrentSubview().observe(viewLifecycleOwner, Observer { subview ->
            if (!writingsViewModel.programmatically) {
                val navController = this.findNavController()
                when (subview) {
                    WritingsViewModel.WritingsSubview.Article -> { }
                    WritingsViewModel.WritingsSubview.Tag -> {
                        navController.navigate(ArticleDetailsFragmentDirections.actionArticleDetailsFragmentToTagTotalFragment())
                    }
                    WritingsViewModel.WritingsSubview.Series -> TODO()
                }
            }
        })
    }

    private val blogAPI = BlogAPI()

    private fun toArticleDetailPage(pager: ViewPager2, title: String) {
        val targetIndex = this.viewModel.detailViewModels.indexOfFirst { detailViewModel ->
            detailViewModel.title == title
        }
        if (targetIndex >= 0) {
            pager.currentItem = targetIndex
        } else {
            this.viewModel.detailViewModels.add(ArticleDetailViewModel(title, this.blogAPI))
            pager.currentItem = this.viewModel.detailViewModels.count() - 1
        }
    }
}

class ArticleDetailsAdapter(
    fragment: Fragment,
    private val articleDetailViewModels: MutableList<ArticleDetailViewModel>
) : FragmentStateAdapter(fragment) {

    override fun getItemCount(): Int {
        return this.articleDetailViewModels.count()
    }

    override fun createFragment(position: Int): Fragment {
        return ArticleDetailFragment(this.articleDetailViewModels[position].title, this.articleDetailViewModels[position])
    }
}
