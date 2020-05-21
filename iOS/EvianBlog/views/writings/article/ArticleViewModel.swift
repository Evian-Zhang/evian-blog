//
//  ArticleViewModel.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/20.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation
import Combine

class ArticleViewModel: ObservableObject {
	private let blogAPI: BlogAPI
	
	init(blogAPI: BlogAPI) {
		self.blogAPI = blogAPI
	}
}
