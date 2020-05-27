//
//  BlogAPI.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/20.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Alamofire

import Foundation
import Combine

class BlogAPI {
	let session: Session
	
	// Default `Session` uses `DispatchQueue(label: "org.alamofire.session.rootQueue")` as `rootQueue`
	init(session: Session = .default) {
		self.session = session
	}
	
	func fetch<T: Decodable>(url: URL) -> AnyPublisher<T, BlogAPIError> {
		self.session.request(url)
			.validate()
			.publishDecodable()
			.setFailureType(to: BlogAPIError.self)
			.flatMap { (decodeResponse: DataResponse<T, AFError>) -> AnyPublisher<T, BlogAPIError> in
				switch decodeResponse.result {
					case .success(let value):
						return Combine.Just(value)
							.setFailureType(to: BlogAPIError.self)
							.eraseToAnyPublisher()
					case .failure(let error):
						var blogAPIError: BlogAPIError
						switch error {
							case .responseValidationFailed(reason: let reason):
								blogAPIError = .badResponse(reason)
							
							case .createURLRequestFailed(error: let error):
								blogAPIError = .network(error)
							
							case .responseSerializationFailed(reason: let reason):
								blogAPIError = .decode(reason)
							
							default:
								blogAPIError = .unexpected(error)
						}
						return Combine.Fail(error: blogAPIError)
							.eraseToAnyPublisher()
				}
			}
			.eraseToAnyPublisher()
	}
}

enum BlogAPIError: Error {
	case network(Error)
	case decode(AFError.ResponseSerializationFailureReason)
	case badResponse(AFError.ResponseValidationFailureReason)
	case unexpected(AFError)
}
