package top.evian_zhang.evianblog.views.projects

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TextView
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

import top.evian_zhang.evianblog.R
import top.evian_zhang.evianblog.api.Project

class ProjectsFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_projects, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val fetchingView: LinearLayout = view.findViewById(R.id.project_fetching)
        val failureView: LinearLayout = view.findViewById(R.id.project_failed)
        val projectsListView: RecyclerView = view.findViewById(R.id.project_succeeded_list)
        projectsListView.layoutManager = LinearLayoutManager(context)

        val viewModel: ProjectsViewModel by activityViewModels()

        viewModel.getProjects().observe(viewLifecycleOwner, Observer { tags ->
            projectsListView.adapter = ProjectListAdapter(tags)
        })
        viewModel.getFetchStatus().observe(viewLifecycleOwner, Observer { fetchStatus ->
            when (fetchStatus) {
                ProjectsViewModel.FetchStatus.Fetching -> {
                    failureView.visibility = View.GONE
                    projectsListView.visibility = View.GONE
                    fetchingView.visibility = View.VISIBLE
                }
                ProjectsViewModel.FetchStatus.Succeeded -> {
                    failureView.visibility = View.GONE
                    fetchingView.visibility = View.GONE
                    projectsListView.visibility = View.VISIBLE
                }
                ProjectsViewModel.FetchStatus.Failed -> {
                    fetchingView.visibility = View.GONE
                    projectsListView.visibility = View.GONE
                    failureView.visibility = View.VISIBLE
                }
            }
        })

        val failureText: TextView = view.findViewById(R.id.project_fail_text)
        failureText.setOnClickListener {
            viewModel.fetchProjects()
        }

        viewModel.fetchProjects()
    }
}

class ProjectListAdapter(private val projects: List<Project>) : RecyclerView.Adapter<ProjectItemFragment>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProjectItemFragment {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.fragment_project_item, parent, false)
        return ProjectItemFragment(view)
    }

    override fun getItemCount(): Int {
        return this.projects.count()
    }

    override fun onBindViewHolder(holder: ProjectItemFragment, position: Int) {
        holder.onBind(this.projects[position])
    }
}
