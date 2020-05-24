//
//  ArticleView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/23.
//  Copyright © 2020 Evian张. All rights reserved.
//

import SwiftUI

struct ArticleView: View {
	@ObservedObject var viewModel: ArticleViewModel
	
	var totalView: ArticleTotalView
	var detailView: DetailPageView<ArticleDetailView>
	
	init(articleViewModel: ArticleViewModel) {
		self.viewModel = articleViewModel
		self.totalView = ArticleTotalView(articleTotalViewModel: articleViewModel.totalViewModel)
		self.detailView = DetailPageView(detailPageViewModel: articleViewModel.detailViewModel)
	}
	
	func content() -> AnyView {
		switch self.viewModel.level {
			case .total: return AnyView(self.totalView)
			case .detail: return AnyView(self.detailView)
		}
	}
	
    var body: some View {
		self.content()
    }
	
//	static func == (lhs: ArticleView, rhs: ArticleView) -> Bool {
//		return lhs.viewModel.level == rhs.viewModel.level && lhs.totalView.viewModel.articles.count == rhs.totalView.viewModel.articles.count && lhs.detailView.viewControllers.count == rhs.detailView.viewControllers.count && lhs.detailView.currentPage == rhs.detailView.currentPage
//	}
}

struct ArticleView_Previews: PreviewProvider {
    static var previews: some View {
        ArticleView(articleViewModel: ArticleViewModel(blogAPI: BlogAPI()))
    }
}
