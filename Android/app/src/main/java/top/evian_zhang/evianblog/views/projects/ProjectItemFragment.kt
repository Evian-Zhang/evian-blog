package top.evian_zhang.evianblog.views.projects

import android.content.Intent
import android.net.Uri
import android.view.View
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

import top.evian_zhang.evianblog.R
import top.evian_zhang.evianblog.api.Project

class ProjectItemFragment(itemView: View) : RecyclerView.ViewHolder(itemView) {
    private val nameView: TextView = itemView.findViewById(R.id.project_item_name)
    private val descriptionView: TextView = itemView.findViewById(R.id.project_item_description)
    private val languagesView: TextView = itemView.findViewById(R.id.project_item_languages)
    private val frameworksView: TextView = itemView.findViewById(R.id.project_item_frameworks)

    fun onBind(project: Project) {
        this.nameView.text = project.name
        this.nameView.setOnClickListener {
            itemView.context.startActivity(
                Intent(
                    Intent.ACTION_VIEW,
                    Uri.parse(project.url)
                )
            )
        }
        this.descriptionView.text = project.description
        this.languagesView.text = itemView.context.getString(R.string.project_languages_text, project.language.joinToString())
        this.frameworksView.text = itemView.context.getString(R.string.project_frameworks_text, project.frameworks.joinToString())
    }
}