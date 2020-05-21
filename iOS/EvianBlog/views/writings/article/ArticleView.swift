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
	
	init(viewModel: ArticleViewModel) {
		self.viewModel = viewModel
		self.viewModel.fetchMoreArticles()
	}
	
	func indicatorOfFetchingStatus(fetchStatus: ArticleViewModel.FetchStatus) -> AnyView {
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
			  ForEach(self.viewModel.articles.enumerated().map({ $0 }), id: \.1.title) { (index, article) in
				  Text(article.title)
					  .onAppear(perform: {
						  if index == self.viewModel.articles.count - 2 {
							  self.viewModel.fetchMoreArticles()
						  }
					  })
			  }
			  self.indicatorOfFetchingStatus(fetchStatus: self.viewModel.fetchStatus)
		  }
	}
}

struct ArticleView_Previews: PreviewProvider {
	private static let articleViewModel = ArticleViewModel(blogAPI: BlogAPI())
    static var previews: some View {
		ArticleView(viewModel: self.articleViewModel)
    }
}
