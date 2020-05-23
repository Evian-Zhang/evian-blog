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
	
	private var totalView: ArticleTotalView
	private var detailViews: [ArticleDetailView]
	
	init(articleViewModel: ArticleViewModel) {
		self.viewModel = articleViewModel
		let totalViewModel = articleViewModel.generateTotalViewModel()
		self.totalView = ArticleTotalView(articleTotalViewModel: articleViewModel.generateTotalViewModel())
		articleViewModel.totalViewModel = totalViewModel
		self.detailViews = []
	}
	
	func content() -> AnyView {
		switch self.viewModel.level {
			case .total: return AnyView(self.totalView)
			case .detail:
				if self.detailViews.isEmpty {
					return AnyView(Text("No detail view").font(.largeTitle))
				} else {
					return AnyView(self.detailViews[self.viewModel.currentDetailViewIndex])
				}
		}
	}
	
    var body: some View {
		self.content()
    }
}

struct ArticleView_Previews: PreviewProvider {
    static var previews: some View {
        ArticleView(articleViewModel: ArticleViewModel(blogAPI: BlogAPI()))
    }
}
