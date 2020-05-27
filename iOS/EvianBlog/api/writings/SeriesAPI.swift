//
//  SeriesAPI.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Alamofire

import Foundation
import Combine

extension BlogAPI {
	func getSeries() -> AnyPublisher<[Series], BlogAPIError> {
		self.fetch(url: Endpoint.Writings.Series.getSeries)
	}
	
	func getArticlesCountOfSeries(name: String) -> AnyPublisher<UInt, BlogAPIError> {
		self.fetch(url: Endpoint.Writings.Series.getArticlesCountOfSeries(name))
	}
	
	func getArticlesOfSeries(name: String, pageIndex: UInt, pageSize: UInt) -> AnyPublisher<[ArticleMeta], BlogAPIError> {
		self.fetch(url: Endpoint.Writings.Series.getArticlesOfSeries(name, pageIndex, pageSize))
	}
}
