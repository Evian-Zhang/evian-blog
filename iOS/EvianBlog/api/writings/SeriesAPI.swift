//
//  TagAPI.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation
import Alamofire

struct SeriesAPI {
	static func getSeries(completionHandler: @escaping (DataResponse<[Tag], AFError>) -> Void) {
		AF.request(Endpoint.writings.series.getSeries as URL)
			.responseDecodable(completionHandler: completionHandler)
	}
	
	static func getArticlesCountOfSeries(name: String, completionHandler: @escaping (DataResponse<UInt, AFError>) -> Void) {
		AF.request(Endpoint.writings.series.getArticlesCountOfSeries(name) as URL)
			.responseDecodable(completionHandler: completionHandler)
	}
	
	static func getArticlesOfSeries(name: String, pageIndex: UInt, pageSize: UInt, completionHandler: @escaping (DataResponse<UInt, AFError>) -> Void) {
		AF.request(Endpoint.writings.series.getArticlesOfSeries(name, pageIndex, pageSize) as URL)
			.responseDecodable(completionHandler: completionHandler)
	}
}
