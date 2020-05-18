//
//  util.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation

struct Endpoint {
	static private let baseEndpoint = NSURL(string: "https://evian-zhang.top/")!
	static private let apiEndpoint = NSURL(string: "api/v1/", relativeTo: baseEndpoint as URL)!
	static private let writingsEndpoint = NSURL(string: "writings/", relativeTo: apiEndpoint as URL)!
	static private let projectsEndpoint = NSURL(string: "projects", relativeTo: apiEndpoint as URL)!
	static private let resumeEndpoint = NSURL(string: "resume", relativeTo: apiEndpoint as URL)!
	
	struct Article {
		let getArticlesCount = NSURL(string: "articles/count", relativeTo: writingsEndpoint as URL)!
		let getArticleMetas = { (pageIndex: UInt, pageSize: UInt) in
			NSURL(string: "articles?pageIndex=\(pageIndex)&pageSize=\(pageSize)", relativeTo: writingsEndpoint as URL)!
		}
		let getArticle = { (title: String) in
			NSURL(string: "article/\(title)", relativeTo: writingsEndpoint as URL)!
		}
		let getArticleTitles = NSURL(string: "articles/titles", relativeTo: writingsEndpoint as URL)!
	}
	
	struct Tag {
		let getTags = NSURL(string: "tags", relativeTo: writingsEndpoint as URL)!
		let getArticlesCountOfTag = { (name: String) in
			NSURL(string: "tag/\(name)/count", relativeTo: writingsEndpoint as URL)!
		}
		let getArticlesOfTag = { (name: String, pageIndex: UInt, pageSize: UInt) in
			NSURL(string: "tag/\(name)?pageIndex=\(pageIndex)&pageSize=\(pageSize)")!
		}
	}
	
	struct Series {
		let getSeries = NSURL(string: "series", relativeTo: writingsEndpoint as URL)!
		let getArticlesCountOfSeries = { (name: String) in
			NSURL(string: "series/\(name)/count", relativeTo: writingsEndpoint as URL)!
		}
		let getArticlesOfSeries = { (name: String, pageIndex: UInt, pageSize: UInt) in
			NSURL(string: "series/\(name)?pageIndex=\(pageIndex)&pageSize=\(pageSize)")!
		}
	}
	
	struct Writings {
		let article = Article()
		let tag = Tag()
		let series = Series()
	}
	
	struct Projects {
		let getProjects = projectsEndpoint
	}
	
	struct Resume {
		let getResume = resumeEndpoint
	}
	
	static let writings = Writings()
	static let projects = Projects()
	static let resume = Resume()
	
	static let imageBaseUrl = NSURL(string: "https://evian-zhang.top/img/")!
}
