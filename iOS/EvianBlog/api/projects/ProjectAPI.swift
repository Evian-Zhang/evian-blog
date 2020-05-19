//
//  ProjectAPI.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation
import Alamofire

struct ProjectAPI {
	static func getProjects(completionHandler: @escaping (DataResponse<[Project], AFError>) -> Void) {
		AF.request(Endpoint.Projects.getProjects)
			.responseDecodable(completionHandler: completionHandler)
	}
}
