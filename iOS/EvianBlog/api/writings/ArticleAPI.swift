//
//  article-api.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation
import Alamofire

extension BlogAPI {
	func getArticlesCount() -> DataResponsePublisher<UInt> {
		self.session.request(Endpoint.Writings.Article.getArticlesCount).publishDecodable()
	}

	func getArticleMetas(pageIndex: UInt, pageSize: UInt) -> DataResponsePublisher<[ArticleMeta]> {
		self.session.request(Endpoint.Writings.Article.getArticleMetas(pageIndex, pageSize)).publishDecodable()
	}

	func getArticle(title: String) -> DataResponsePublisher<Article> {
		AF.request(Endpoint.Writings.Article.getArticle(title)).publishDecodable()
	}

	func getArticleTitles() -> DataResponsePublisher<[String]> {
		AF.request(Endpoint.Writings.Article.getArticleTitles).publishDecodable()
	}
}
