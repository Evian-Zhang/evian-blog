//
//  TagAPI.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation
import Alamofire

struct TagAPI {
	static func getTags(completionHandler: @escaping (DataResponse<[Tag], AFError>) -> Void) {
		AF.request(Endpoint.Writings.Tag.getTags)
			.responseDecodable(completionHandler: completionHandler)
	}
	
	static func getArticlesCountOfTag(name: String, completionHandler: @escaping (DataResponse<UInt, AFError>) -> Void) {
		AF.request(Endpoint.Writings.Tag.getArticlesCountOfTag(name))
			.responseDecodable(completionHandler: completionHandler)
	}
	
	static func getArticlesOfTag(name: String, pageIndex: UInt, pageSize: UInt, completionHandler: @escaping (DataResponse<UInt, AFError>) -> Void) {
		AF.request(Endpoint.Writings.Tag.getArticlesOfTag(name, pageIndex, pageSize))
			.responseDecodable(completionHandler: completionHandler)
	}
}
