//
//  util.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation

struct Endpoint {
	static private let baseEndpoint = URL(string: "https://evian-zhang.top/")!
	static private let apiEndpoint = URL(string: "api/v1/", relativeTo: baseEndpoint)!
	
	struct Writings {
		static private let writingsEndpoint = URL(string: "writings/", relativeTo: apiEndpoint)!
		struct Article {
			static let getArticlesCount = URL(string: "articles/count", relativeTo: writingsEndpoint)!
			static let getArticleMetas = { (pageIndex: UInt, pageSize: UInt) in
				URL(string: "articles?pageIndex=\(pageIndex)&pageSize=\(pageSize)", relativeTo: writingsEndpoint)!
			}
			static let getArticle = { (title: String) in
				URL(string: "article/\(title.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed)!)", relativeTo: writingsEndpoint)!
			}
			static let getArticleTitles = URL(string: "articles/titles", relativeTo: writingsEndpoint)!
		}
		
		struct Tag {
			static let getTags = URL(string: "tags", relativeTo: writingsEndpoint)!
			static let getArticlesCountOfTag = { (name: String) in
				URL(string: "tag/\(name.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed)!)/count", relativeTo: writingsEndpoint)!
			}
			static let getArticlesOfTag = { (name: String, pageIndex: UInt, pageSize: UInt) in
				URL(string: "tag/\(name.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed)!)?pageIndex=\(pageIndex)&pageSize=\(pageSize)", relativeTo: writingsEndpoint)!
			}
		}
		
		struct Series {
			static let getSeries = URL(string: "series", relativeTo: writingsEndpoint)!
			static let getArticlesCountOfSeries = { (name: String) in
				URL(string: "series/\(name.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed)!)/count", relativeTo: writingsEndpoint)!
			}
			static let getArticlesOfSeries = { (name: String, pageIndex: UInt, pageSize: UInt) in
				URL(string: "series/\(name.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed)!)?pageIndex=\(pageIndex)&pageSize=\(pageSize)", relativeTo: writingsEndpoint)!
			}
		}
	}
	
	struct Projects {
		static private let projectsEndpoint = URL(string: "projects", relativeTo: apiEndpoint)!
		static let getProjects = projectsEndpoint
	}
	
	struct Resume {
		static private let resumeEndpoint = URL(string: "resume", relativeTo: apiEndpoint)!
		static let getResume = resumeEndpoint
	}
	
	static let imageBaseUrl = URL(string: "https://evian-zhang.top/img/")!
}
