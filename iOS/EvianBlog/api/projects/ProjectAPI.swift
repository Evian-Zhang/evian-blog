//
//  ProjectAPI.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation
import Alamofire

extension BlogAPI {
	func getProjects() -> DataResponsePublisher<[Project]> {
		self.session.request(Endpoint.Projects.getProjects).publishDecodable()
	}
}
