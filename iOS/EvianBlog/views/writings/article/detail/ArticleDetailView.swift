//
//  ArticleDetailView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/23.
//  Copyright © 2020 Evian张. All rights reserved.
//

import SwiftUI

struct ArticleDetailView: View {
	@ObservedObject var viewModel: ArticleDetailViewModel
	
	init(articleDetailViewModel: ArticleDetailViewModel) {
		self.viewModel = articleDetailViewModel
		
		articleDetailViewModel.fetchArticle()
	}
	
	func contentOfSeries(series: String?, seriesIndex: UInt?) -> AnyView {
		if case let (.some(series), .some(seriesIndex)) = (series, seriesIndex) {
			return AnyView(
				HStack {
					Button(series, action: {
						self.viewModel.onSeriesPressed(seriesName: series)
					})
						.buttonStyle(BorderlessButtonStyle())
					Text("series[\(seriesIndex + 1)]")
				}
				.font(.subheadline)
			)
		} else {
			return AnyView(EmptyView())
		}
	}
	
	var articleBody: some View {
		ScrollView {
			VStack {
				self.contentOfSeries(series: self.viewModel.series, seriesIndex: self.viewModel.seriesIndex)
				Text(self.viewModel.articleTitle).font(.title)
				if !self.viewModel.tags.isEmpty {
					ScrollView([.horizontal], showsIndicators: false) {
						HStack {
							ForEach(self.viewModel.tags, id: \.self) { tag in
								Button(tag, action: {
									self.viewModel.onTagPressed(tagName: tag)
								})
									.buttonStyle(BorderlessButtonStyle())
									.font(.subheadline)
							}
						}
					}
				}
				Text(self.viewModel.body).font(.body)
			}
		}
	}
	
	func indicatorOf(fetchStatus: ArticleDetailViewModel.FetchStatus) -> AnyView {
		switch fetchStatus {
			case .fetching: return AnyView(Text("Loading...").font(.largeTitle))
			case .success: return AnyView(self.articleBody)
			case .failure: return AnyView(VStack {
				Text("Failed to request.")
				Button("Reload", action: self.viewModel.fetchArticle)
					.buttonStyle(BorderlessButtonStyle())
			}.font(.largeTitle))
		}
	}
	
    var body: some View {
		self.indicatorOf(fetchStatus: self.viewModel.fetchStatus)
    }
}

struct ArticleDetailView_Previews: PreviewProvider {
    static var previews: some View {
        ArticleDetailView(articleDetailViewModel: ArticleDetailViewModel(blogAPI: BlogAPI(), articleTitle: "A title"))
    }
}
