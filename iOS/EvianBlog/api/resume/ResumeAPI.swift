//
//  ResumeAPI.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Alamofire

import Foundation
import Combine

extension BlogAPI {
		func getResume() -> AnyPublisher<String, BlogAPIError> {
//			AF.request(Endpoint.Resume.getResume)
//				.responseDecodable(completionHandler: completionHandler)
			self.session.request(Endpoint.Resume.getResume).publishDecodable(type: String)
//				.mapError({ networkError in BlogAPIError.network(networkError) })
				.flatMap { (decodableResponse: DataResponse<String, AFError>) -> Result<String, BlogAPIError>.Publisher in
					if let decodableError = decodableResponse.error {
						return Result.Publisher.Failure(error: decodableError)
					} else {
						return Result.Publisher.Success(decodableResponse.data!)
					}
				}
//				.eraseToAnyPublisher()
		}
}
