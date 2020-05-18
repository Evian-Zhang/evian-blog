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
		AF.request(Endpoint.writings.tag.getTags as URL)
			.responseDecodable(completionHandler: completionHandler)
	}
	
	static func getArticlesCountOfTag(name: String, completionHandler: @escaping (DataResponse<UInt, AFError>) -> Void) {
		AF.request(Endpoint.writings.tag.getArticlesCountOfTag(name) as URL)
			.responseDecodable(completionHandler: completionHandler)
	}
	
	static func getArticlesOfTag(name: String, pageIndex: UInt, pageSize: UInt, completionHandler: @escaping (DataResponse<UInt, AFError>) -> Void) {
		AF.request(Endpoint.writings.tag.getArticlesOfTag(name, pageIndex, pageSize) as URL)
			.responseDecodable(completionHandler: completionHandler)
	}
}
