//
//  BlogAPI.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/20.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation
import Alamofire

struct BlogAPI {
	let session: Session
	
	init(session: Session) {
		self.session = session
	}
}
