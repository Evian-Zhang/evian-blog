//
//  article-api.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation
import Alamofire

struct ArticleAPI {
	static func getArticlesCount(completionHandler: @escaping (DataResponse<UInt, AFError>) -> Void) {
		AF.request(Endpoint.writings.article.getArticlesCount as URL)
			.responseDecodable(completionHandler: completionHandler)
	}

	static func getArticleMetas(pageIndex: UInt, pageSize: UInt, completionHandler: @escaping (DataResponse<[ArticleMeta], AFError>) -> Void) {
		AF.request(Endpoint.writings.article.getArticleMetas(pageIndex, pageSize) as URL)
			.responseDecodable(completionHandler: completionHandler)
	}

	static func getArticle(title: String, completionHandler: @escaping (DataResponse<Article, AFError>) -> Void) {
		AF.request(Endpoint.writings.article.getArticle(title) as URL)
			.responseDecodable(completionHandler: completionHandler)
	}

	static func getArticleTitles(completionHandler: @escaping (DataResponse<[String], AFError>) -> Void) {
		AF.request(Endpoint.writings.article.getArticleTitles as URL)
			.responseDecodable(completionHandler: completionHandler)
	}
}
