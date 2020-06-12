package top.evian_zhang.evianblog.api.projects

import top.evian_zhang.evianblog.api.Project
import top.evian_zhang.evianblog.api.BlogAPI
import top.evian_zhang.evianblog.api.Endpoint

suspend fun BlogAPI.getProject(): Array<Project> {
    return this.fetch(Endpoint.Projects.getProjects)
}
