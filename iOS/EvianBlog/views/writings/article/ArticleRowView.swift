//
//  ArticleRowView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/22.
//  Copyright © 2020 Evian张. All rights reserved.
//

import SwiftUI

struct ArticleRowView: View {
	private let viewModel: ArticleRowViewModel
	
	init(articleRowViewModel: ArticleRowViewModel) {
		self.viewModel = articleRowViewModel
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
	
    var body: some View {
		VStack(alignment: HorizontalAlignment.leading) {
			Text(self.viewModel.title)
				.font(.headline)
				// https://stackoverflow.com/a/59277022/10005095
				.fixedSize(horizontal: false, vertical: true)
			self.contentOfSeries(series: self.viewModel.series, seriesIndex: self.viewModel.seriesIndex)
			Text("Last revised at \(self.viewModel.lastReviseDateString)")
				.font(.subheadline)
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
    }
}

struct ArticleRowView_Previews: PreviewProvider {
	static let article = ArticleMeta(title: "A very very very very very very very very very very long title", publishDate: 1588920469, lastReviseDate: 1588920469, tags: ["Test tag1", "Test tag2", "Test tag3", "Test tag4", "Test tag5", "Test tag6", "Test tag7"], series: "Test Series", seriesIndex: 0)
	static let dateFormatter = { () -> DateFormatter in
		let dateFormatter = DateFormatter()
		dateFormatter.dateStyle = .long
		dateFormatter.timeStyle = .none
		dateFormatter.locale = Locale.current
		return dateFormatter
	}()
    static var previews: some View {
		ArticleRowView(articleRowViewModel: ArticleRowViewModel(articleMeta: article, dateFormatter: dateFormatter))
    }
}
