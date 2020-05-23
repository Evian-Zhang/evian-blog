//
//  ArticleDetailViewModel.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/23.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation

class ArticleDetailViewModel: ObservableObject {
	private let blogAPI: BlogAPI
	let articleTitle: String
	
	init(blogAPI: BlogAPI, articleTitle: String) {
		self.blogAPI = blogAPI
		self.articleTitle = articleTitle
	}
}
