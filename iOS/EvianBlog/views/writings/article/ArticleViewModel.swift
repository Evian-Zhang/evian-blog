//
//  ArticleViewModel.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/23.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation

class ArticleViewModel: ObservableObject, WritingsSubviewDelegate {
	@Published var level: WritingsSubviewLevel = .total
	@Published var currentDetailViewIndex = 0
	
	private let blogAPI: BlogAPI
	weak var totalViewModel: ArticleTotalViewModel? = nil
	weak var detailViewModel: ArticleDetailViewModel? = nil
	
	init(blogAPI: BlogAPI) {
		self.blogAPI = blogAPI
	}
	
	func generateTotalViewModel() -> ArticleTotalViewModel {
		ArticleTotalViewModel(blogAPI: self.blogAPI)
	}
	
	func generateDetailViewModel(articleTitle: String) -> ArticleDetailViewModel {
		ArticleDetailViewModel(blogAPI: self.blogAPI, articleTitle: articleTitle)
	}
	
	func currentLevel() -> WritingsSubviewLevel {
		self.level
	}
	
	func changeLevel(to writingsSubviewLevel: WritingsSubviewLevel) {
		self.level = writingsSubviewLevel
	}
}
