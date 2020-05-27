//
//  ArticleListView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/20.
//  Copyright © 2020 Evian张. All rights reserved.
//

import SwiftUI

struct ArticleListView: View {
	@ObservedObject var viewModel: ArticleListViewModel
	
	private let dateFormatter = DateFormatter()
	
	init(articleListViewModel: ArticleListViewModel) {
		self.dateFormatter.dateStyle = .long
		self.dateFormatter.timeStyle = .none
		self.dateFormatter.locale = Locale.current
		
		self.viewModel = articleListViewModel
		self.viewModel.fetchMoreArticles()
	}
	
	func indicatorOf(fetchStatus: ArticleListViewModel.FetchStatus) -> AnyView {
		switch fetchStatus {
			case .fetching: return AnyView(Text("Loading..."))
			case .success: return AnyView(EmptyView())
			case .failure: return AnyView(HStack {
				Text("Failed to request.")
				Button("Reload", action: self.viewModel.fetchMoreArticles)
					.buttonStyle(BorderlessButtonStyle())
			})
		}
	}
	
    var body: some View {
		List {
			if !self.viewModel.accessory.isEmpty {
				Text(self.viewModel.accessory).font(.largeTitle)
			}
			ForEach(self.viewModel.articles.enumerated().map({ $0 }), id: \.1.title) { (index, articleMeta) in
				ArticleRowView(articleRowViewModel: ArticleRowViewModel(articleMeta: articleMeta, dateFormatter: self.dateFormatter))
					.onAppear(perform: {
						if index >= self.viewModel.articles.count - 2 {
							self.viewModel.fetchMoreArticles()
						}
					})
			}
			self.indicatorOf(fetchStatus: self.viewModel.fetchStatus)
		}
	}
}

struct ArticleTotalView_Previews: PreviewProvider {
	private static let blogAPI = BlogAPI()
	private static let articleListViewModel = ArticleListViewModel(articleFetcher: blogAPI.getArticleMetas)
    static var previews: some View {
		ArticleListView(articleListViewModel: self.articleListViewModel)
    }
}
