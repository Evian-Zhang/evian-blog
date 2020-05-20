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
	func getTags() -> DataResponsePublisher<[Tag]> {
		self.session.request(Endpoint.Writings.Tag.getTags).publishDecodable()
	}
	
	func getArticlesCountOfTag(name: String) -> DataResponsePublisher<UInt> {
		self.session.request(Endpoint.Writings.Tag.getArticlesCountOfTag(name)).publishDecodable()
	}
	
	func getArticlesOfTag(name: String, pageIndex: UInt, pageSize: UInt) -> DataResponsePublisher<[Article]> {
		self.session.request(Endpoint.Writings.Tag.getArticlesOfTag(name, pageIndex, pageSize)).publishDecodable()
	}
}
