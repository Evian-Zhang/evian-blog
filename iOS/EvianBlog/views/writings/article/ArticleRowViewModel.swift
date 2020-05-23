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
	
	init(articleMeta: ArticleMeta, dateFormatter: DateFormatter) {
		self.articleMeta = articleMeta
		self.dateFormatter = dateFormatter
	}
	
	var title: String { self.articleMeta.title }
	var series: String? { self.articleMeta.series }
	var seriesIndex: UInt? { self.articleMeta.seriesIndex }
	var tags: [String] { self.articleMeta.tags }
	var lastReviseDateString: String {
		let lastReviseDate = Date(timeIntervalSince1970: TimeInterval(self.articleMeta.lastReviseDate))
		return dateFormatter.string(from: lastReviseDate)
	}
	
	func onSeriesPressed(seriesName: String) {
		NotificationCenter.default.post(name: Notification.EBWritingsSeriesNameDidPressed, object: nil, userInfo: ["name": seriesName])
	}
	
	func onTagPressed(tagName: String) {
		NotificationCenter.default.post(name: Notification.EBWritingsTagNameDidPressed, object: nil, userInfo: ["name": tagName])
	}
}
