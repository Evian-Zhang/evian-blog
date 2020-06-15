package top.evian_zhang.evianblog.views.writings.series

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
import top.evian_zhang.evianblog.api.Series
import top.evian_zhang.evianblog.views.writings.WritingsViewModel
import top.evian_zhang.evianblog.views.writings.tag.TagDetailsFragmentDirections

class SeriesTotalFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_series_total, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val fetchingView: LinearLayout = view.findViewById(R.id.series_total_fetching)
        val failureView: LinearLayout = view.findViewById(R.id.series_total_failed)
        val seriesListView: RecyclerView = view.findViewById(R.id.series_total_succeeded_list)
        seriesListView.layoutManager = LinearLayoutManager(context)

        val viewModel: SeriesTotalViewModel by activityViewModels()

        viewModel.getSeries().observe(viewLifecycleOwner, Observer { series ->
            seriesListView.adapter = SeriesListAdapter(series)
        })
        viewModel.getFetchStatus().observe(viewLifecycleOwner, Observer { fetchStatus ->
            when (fetchStatus) {
                SeriesTotalViewModel.FetchStatus.Fetching -> {
                    failureView.visibility = View.GONE
                    seriesListView.visibility = View.GONE
                    fetchingView.visibility = View.VISIBLE
                }
                SeriesTotalViewModel.FetchStatus.Succeeded -> {
                    failureView.visibility = View.GONE
                    fetchingView.visibility = View.GONE
                    seriesListView.visibility = View.VISIBLE
                }
                SeriesTotalViewModel.FetchStatus.Failed -> {
                    fetchingView.visibility = View.GONE
                    seriesListView.visibility = View.GONE
                    failureView.visibility = View.VISIBLE
                }
            }
        })

        val failureText: TextView = view.findViewById(R.id.series_total_fail_text)
        failureText.setOnClickListener {
            viewModel.fetchSeries()
        }

        val writingsViewModel: WritingsViewModel by activityViewModels()
        writingsViewModel.getCurrentSubview().observe(viewLifecycleOwner, Observer { subviewState ->
            if (!subviewState.programmatically) {
                val navController = this.findNavController()
                when (subviewState.subview) {
                    WritingsViewModel.WritingsSubview.Article -> {
                        navController.navigate(SeriesTotalFragmentDirections.actionSeriesTotalFragmentToArticleListFragment())
                    }
                    WritingsViewModel.WritingsSubview.Tag -> {
                        navController.navigate(SeriesTotalFragmentDirections.actionSeriesTotalFragmentToTagTotalFragment())
                    }
                    WritingsViewModel.WritingsSubview.Series -> { }
                }
            }
        })

        viewModel.fetchSeries()
    }
}

class SeriesListAdapter(private val series: List<Series>) : RecyclerView.Adapter<SeriesItemFragment>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SeriesItemFragment {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.fragment_series_item, parent, false)
        return SeriesItemFragment(view)
    }

    override fun getItemCount(): Int {
        return this.series.count()
    }

    override fun onBindViewHolder(holder: SeriesItemFragment, position: Int) {
        holder.onBind(this.series[position])
    }
}
