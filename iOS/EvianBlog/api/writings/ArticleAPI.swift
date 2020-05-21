//
//  article-api.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Alamofire

import Foundation
import Combine

extension BlogAPI {
	func getArticlesCount() -> AnyPublisher<UInt, BlogAPIError> {
		self.fetch(url: Endpoint.Writings.Article.getArticlesCount)
	}

	func getArticleMetas(pageIndex: UInt, pageSize: UInt) -> AnyPublisher<[ArticleMeta], BlogAPIError> {
		self.fetch(url: Endpoint.Writings.Article.getArticleMetas(pageIndex, pageSize))
	}

	func getArticle(title: String) -> AnyPublisher<Article, BlogAPIError> {
		self.fetch(url: Endpoint.Writings.Article.getArticle(title))
	}

	func getArticleTitles() -> AnyPublisher<[String], BlogAPIError> {
		self.fetch(url: Endpoint.Writings.Article.getArticleTitles)
	}
}
