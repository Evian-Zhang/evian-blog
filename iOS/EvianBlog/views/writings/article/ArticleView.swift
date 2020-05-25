//
//  ArticleView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/23.
//  Copyright © 2020 Evian张. All rights reserved.
//

import SwiftUI

struct ArticleView: View {
	@ObservedObject private var viewModel: ArticleViewModel
	
	private let totalView: ArticleTotalView
	private let detailView: DetailPageView<ArticleDetailView>
	
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
}

struct ArticleView_Previews: PreviewProvider {
    static var previews: some View {
        ArticleView(articleViewModel: ArticleViewModel(blogAPI: BlogAPI()))
    }
}
