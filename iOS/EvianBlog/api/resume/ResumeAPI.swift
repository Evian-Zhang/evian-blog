//
//  ResumeAPI.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation
import Alamofire

struct ResumeAPI {
	static func getResume(completionHandler: @escaping (DataResponse<String, AFError>) -> Void) {
		AF.request(Endpoint.resume.getResume as URL)
			.responseDecodable(completionHandler: completionHandler)
	}
}
