package top.evian_zhang.evianblog.views.resume

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Observer

import top.evian_zhang.evianblog.R

class ResumeFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_resume, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val fetchingView: LinearLayout = view.findViewById(R.id.resume_fetching)
        val failureView: LinearLayout = view.findViewById(R.id.resume_failed)
        val resumeBodyView: ScrollView = view.findViewById(R.id.resume_succeeded_body)
        val resumeView: TextView = view.findViewById(R.id.resume_body)

        val viewModel: ResumeViewModel by activityViewModels()

        viewModel.getResume().observe(viewLifecycleOwner, Observer { resume ->
            resumeView.text = resume
        })
        viewModel.getFetchStatus().observe(viewLifecycleOwner, Observer { fetchStatus ->
            when (fetchStatus) {
                ResumeViewModel.FetchStatus.Fetching -> {
                    failureView.visibility = View.GONE
                    resumeBodyView.visibility = View.GONE
                    fetchingView.visibility = View.VISIBLE
                }
                ResumeViewModel.FetchStatus.Succeeded -> {
                    failureView.visibility = View.GONE
                    fetchingView.visibility = View.GONE
                    resumeBodyView.visibility = View.VISIBLE
                }
                ResumeViewModel.FetchStatus.Failed -> {
                    fetchingView.visibility = View.GONE
                    resumeBodyView.visibility = View.GONE
                    failureView.visibility = View.VISIBLE
                }
            }
        })

        val failureText: TextView = view.findViewById(R.id.resume_fail_text)
        failureText.setOnClickListener {
            viewModel.fetchResume()
        }

        viewModel.fetchResume()
    }
}
