package top.evian_zhang.evianblog.views.writings.tag

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TextView
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import top.evian_zhang.evianblog.R
import top.evian_zhang.evianblog.api.Tag
import top.evian_zhang.evianblog.views.writings.WritingsViewModel

class TagTotalFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_tag_total, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val fetchingView: LinearLayout = view.findViewById(R.id.tag_total_fetching)
        val failureView: LinearLayout = view.findViewById(R.id.tag_total_failed)
        val tagsListView: RecyclerView = view.findViewById(R.id.tag_total_succeeded_list)
        tagsListView.layoutManager = LinearLayoutManager(context)

        val viewModel: TagTotalViewModel by activityViewModels()

        viewModel.getTags().observe(viewLifecycleOwner, Observer { tags ->
            tagsListView.adapter = TagListAdapter(tags)
        })
        viewModel.getFetchStatus().observe(viewLifecycleOwner, Observer { fetchStatus ->
            when (fetchStatus) {
                TagTotalViewModel.FetchStatus.Fetching -> {
                    failureView.visibility = View.GONE
                    tagsListView.visibility = View.GONE
                    fetchingView.visibility = View.VISIBLE
                }
                TagTotalViewModel.FetchStatus.Succeeded -> {
                    failureView.visibility = View.GONE
                    fetchingView.visibility = View.GONE
                    tagsListView.visibility = View.VISIBLE
                }
                TagTotalViewModel.FetchStatus.Failed -> {
                    fetchingView.visibility = View.GONE
                    tagsListView.visibility = View.GONE
                    failureView.visibility = View.VISIBLE
                }
            }
        })

        val failureText: TextView = view.findViewById(R.id.tag_total_fail_text)
        failureText.setOnClickListener {
            viewModel.fetchTags()
        }

        val writingsViewModel: WritingsViewModel by activityViewModels()
        writingsViewModel.getCurrentSubview().observe(viewLifecycleOwner, Observer { subviewState ->
            if (!subviewState.programmatically) {
                val navController = this.findNavController()
                when (subviewState.subview) {
                    WritingsViewModel.WritingsSubview.Article -> {
                        navController.navigate(TagTotalFragmentDirections.actionTagTotalFragmentToArticleListFragment())
                    }
                    WritingsViewModel.WritingsSubview.Tag -> { }
                    WritingsViewModel.WritingsSubview.Series -> {
                        navController.navigate(TagTotalFragmentDirections.actionTagTotalFragmentToSeriesTotalFragment())
                    }
                }
            }
        })

        viewModel.fetchTags()
    }
}

class TagListAdapter(private val tags: List<Tag>) : RecyclerView.Adapter<TagItemFragment>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TagItemFragment {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.fragment_tag_item, parent, false)
        return TagItemFragment(view)
    }

    override fun getItemCount(): Int {
        return this.tags.count()
    }

    override fun onBindViewHolder(holder: TagItemFragment, position: Int) {
        holder.onBind(this.tags[position])
    }
}
