//
//  ProjectAPI.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Alamofire

import Foundation
import Combine

extension BlogAPI {
	func getProjects() -> AnyPublisher<[Project], BlogAPIError> {
		self.fetch(url: Endpoint.Projects.getProjects)
	}
}
