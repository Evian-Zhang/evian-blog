//
//  TagAPI.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Alamofire

import Foundation
import Combine

extension BlogAPI {
	func getTags() -> AnyPublisher<[Tag], BlogAPIError> {
		self.fetch(url: Endpoint.Writings.Tag.getTags)
	}
	
	func getArticlesCountOfTag(name: String) -> AnyPublisher<UInt, BlogAPIError> {
		self.fetch(url: Endpoint.Writings.Tag.getArticlesCountOfTag(name))
	}
	
	func getArticlesOfTag(name: String, pageIndex: UInt, pageSize: UInt) -> AnyPublisher<[ArticleMeta], BlogAPIError> {
		self.fetch(url: Endpoint.Writings.Tag.getArticlesOfTag(name, pageIndex, pageSize))
	}
}
