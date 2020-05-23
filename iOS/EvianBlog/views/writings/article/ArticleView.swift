//
//  ArticleView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/20.
//  Copyright © 2020 Evian张. All rights reserved.
//

import SwiftUI

struct ArticleView: View {
	@ObservedObject var viewModel: ArticleViewModel
	
	private let dateFormatter = DateFormatter()
	
	init(articleViewModel: ArticleViewModel) {
		self.dateFormatter.dateStyle = .long
		self.dateFormatter.timeStyle = .none
		self.dateFormatter.locale = Locale.current
		
		self.viewModel = articleViewModel
		self.viewModel.fetchMoreArticles()
	}
	
	func indicatorOfFetchStatus(fetchStatus: ArticleViewModel.FetchStatus) -> AnyView {
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
			ForEach(self.viewModel.articles.enumerated().map({ $0 }), id: \.1.title) { (index, articleMeta) in
				ArticleRowView(articleRowViewModel: ArticleRowViewModel(articleMeta: articleMeta, dateFormatter: self.dateFormatter))
					.onAppear(perform: {
						if index == self.viewModel.articles.count - 2 {
							self.viewModel.fetchMoreArticles()
						}
					})
			}
			self.indicatorOfFetchStatus(fetchStatus: self.viewModel.fetchStatus)
		}
	}
}

struct ArticleView_Previews: PreviewProvider {
	private static let blogAPI = BlogAPI()
	private static let articleViewModel = ArticleViewModel(blogAPI: blogAPI)
    static var previews: some View {
		ArticleView(articleViewModel: self.articleViewModel)
    }
}
