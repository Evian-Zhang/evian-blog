//
//  ArticleRowViewModel.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/22.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation

struct ArticleRowViewModel {
	private let articleMeta: ArticleMeta
	private let dateFormatter: DateFormatter
	let writingsViewDelegate: WritingsViewDelegate
	
	init(articleMeta: ArticleMeta, dateFormatter: DateFormatter, writingsViewDelegate: WritingsViewDelegate) {
		self.articleMeta = articleMeta
		self.dateFormatter = dateFormatter
		self.writingsViewDelegate = writingsViewDelegate
	}
	
	var title: String { self.articleMeta.title }
	var series: String? { self.articleMeta.series }
	var seriesIndex: UInt? { self.articleMeta.seriesIndex }
	var tags: [String] { self.articleMeta.tags }
	var lastReviseDateString: String {
		let lastReviseDate = Date(timeIntervalSince1970: TimeInterval(self.articleMeta.lastReviseDate))
		return dateFormatter.string(from: lastReviseDate)
	}
	
	func onSeriesPressed(series: String) {
		
	}
	
	func onTagPressed(tag: String) {
		
	}
}
