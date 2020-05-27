//
//  SeriesViewModel.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/27.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation

class SeriesViewModel: ObservableObject, WritingsSubviewDelegate {
	@Published var level: WritingsSubviewLevel = .total
	
	private let blogAPI: BlogAPI
	var totalViewModel: SeriesTotalViewModel
	var detailViewModel: DetailPageViewModel<ArticleListView>
	
	init(blogAPI: BlogAPI) {
		self.blogAPI = blogAPI
		self.totalViewModel = SeriesTotalViewModel(blogAPI: self.blogAPI)
		self.detailViewModel = DetailPageViewModel([])
	}
	
	// MARK: WritingsSubviewDelegate conformity
	func currentLevel() -> WritingsSubviewLevel {
		self.level
	}
	
	func changeLevel(to writingsSubviewLevel: WritingsSubviewLevel) {
		self.level = writingsSubviewLevel
	}
	
	func navigateToDetailPage(name: String) {
		if let targetPage = self.detailViewModel.hasView(where: { articleListView in
			articleListView.viewModel.accessory == name
		}) {
			self.detailViewModel.currentPage = targetPage
		} else {
			self.detailViewModel.addView(ArticleListView(articleListViewModel: ArticleListViewModel(articleFetcher: { (pageIndex, pageSize) in
				self.blogAPI.getArticlesOfSeries(name: name, pageIndex: pageIndex, pageSize: pageSize)
			}, accessory: name)))
		}
	}
}

