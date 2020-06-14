package top.evian_zhang.evianblog.views.writings

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Observer
import com.google.android.material.tabs.TabLayout

import top.evian_zhang.evianblog.R

class WritingsFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_writings, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val viewModel: WritingsViewModel by activityViewModels()
        val writingsTabs: TabLayout = view.findViewById(R.id.writings_tabs)
        viewModel.getCurrentSubview().observe(viewLifecycleOwner, Observer { subview ->
            if (viewModel.programmatically) {
                when (subview) {
                    WritingsViewModel.WritingsSubview.Article -> writingsTabs.selectTab(
                        writingsTabs.getTabAt(0)
                    )
                    WritingsViewModel.WritingsSubview.Tag -> writingsTabs.selectTab(
                        writingsTabs.getTabAt(1)
                    )
                    WritingsViewModel.WritingsSubview.Series -> writingsTabs.selectTab(
                        writingsTabs.getTabAt(2)
                    )
                }
                viewModel.programmatically = false
            }
        })
        writingsTabs.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
            override fun onTabSelected(tab: TabLayout.Tab?) {
                if (!viewModel.programmatically) {
                    when (tab?.position ?: 0) {
                        0 -> {
                            viewModel.setCurrentSubview(WritingsViewModel.WritingsSubview.Article)
                        }
                        1 -> {
                            viewModel.setCurrentSubview(WritingsViewModel.WritingsSubview.Tag)
                        }
                        2 -> {
                            viewModel.setCurrentSubview(WritingsViewModel.WritingsSubview.Series)
                        }
                    }
                }
            }

            override fun onTabReselected(tab: TabLayout.Tab?) {

            }

            override fun onTabUnselected(tab: TabLayout.Tab?) {

            }
        })
    }
}
