//
//  TagAPI.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation
import Alamofire

extension BlogAPI {
	func getSeries() -> DataResponsePublisher<Series> {
		self.session.request(Endpoint.Writings.Series.getSeries).publishDecodable()
	}
	
	func getArticlesCountOfSeries(name: String) -> DataResponsePublisher<UInt> {
		self.session.request(Endpoint.Writings.Series.getArticlesCountOfSeries(name)).publishDecodable()
	}
	
	func getArticlesOfSeries(name: String, pageIndex: UInt, pageSize: UInt) -> DataResponsePublisher<[Article]> {
		self.session.request(Endpoint.Writings.Series.getArticlesOfSeries(name, pageIndex, pageSize)).publishDecodable()
	}
}
