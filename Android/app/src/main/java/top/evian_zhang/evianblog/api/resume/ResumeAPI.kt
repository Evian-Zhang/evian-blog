package top.evian_zhang.evianblog.api.resume

import top.evian_zhang.evianblog.api.BlogAPI
import top.evian_zhang.evianblog.api.Endpoint

suspend fun BlogAPI.getResume(): String {
    return this.fetch(Endpoint.Resume.getResume)
}
