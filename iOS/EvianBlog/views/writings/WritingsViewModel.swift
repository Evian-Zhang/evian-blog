//
//  WritingsViewModel.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/22.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation
import Combine

enum WritingsSegment: CaseIterable, CustomStringConvertible {
	case article
	case tag
	case series
	
	var description: String {
		get {
			switch self {
				case .article: return "Articles"
				case .tag: return "Tags"
				case .series: return "Series"
			}
		}
	}
}

class WritingsViewModel: ObservableObject {
	@Published var selectedWritingsSegment: WritingsSegment = .article
	
	private let blogAPI: BlogAPI
	// used to store `AnyCancellable`, without keeping this reference alive, the publisher will terminate immediately
	private var disposables = Set<AnyCancellable>()
	let articleViewModel: ArticleViewModel
	let tagViewModel: TagViewModel
	let seriesViewModel: SeriesViewModel
	
	init(blogAPI: BlogAPI) {
		self.blogAPI = blogAPI
		self.articleViewModel = ArticleViewModel(blogAPI: blogAPI)
		self.tagViewModel = TagViewModel(blogAPI: blogAPI)
		self.seriesViewModel = SeriesViewModel(blogAPI: blogAPI)
		
		self.observeArticleTitlePressed()
		self.observeTagNamePressed()
		self.observeSeriesNamePressed()
	}
	
	var subviewDelegate: WritingsSubviewDelegate {
		switch self.selectedWritingsSegment {
			case .article: return self.articleViewModel
			case .tag: return self.tagViewModel
			case .series: return self.seriesViewModel
		}
	}
	
	func observeArticleTitlePressed() {
		NotificationCenter.default.publisher(for: Notification.EBWritingsArticleTitleDidPressed)
			.map { notification in
				notification.userInfo!["title"] as! String
			}
			.sink { articleTitle in
				self.selectedWritingsSegment = .article
				self.subviewDelegate.changeLevel(to: .detail)
				self.subviewDelegate.navigateToDetailPage(name: articleTitle)
			}
			.store(in: &self.disposables)
	}
	
	func observeTagNamePressed() {
		NotificationCenter.default.publisher(for: Notification.EBWritingsTagNameDidPressed)
			.map { notification in
				notification.userInfo!["name"] as! String
			}
			.sink { tagName in
				self.selectedWritingsSegment = .tag
				self.subviewDelegate.changeLevel(to: .detail)
				self.subviewDelegate.navigateToDetailPage(name: tagName)
			  
			}
			.store(in: &self.disposables)
	}
	
	func observeSeriesNamePressed() {
		NotificationCenter.default.publisher(for: Notification.EBWritingsSeriesNameDidPressed)
			.map { notification in
				notification.userInfo!["name"] as! String
			}
			.sink { seriesName in
				self.selectedWritingsSegment = .series
				self.subviewDelegate.changeLevel(to: .detail)
				self.subviewDelegate.navigateToDetailPage(name: seriesName)
			}
			.store(in: &self.disposables)
	}
	
	func switchLevel() {
		var targetLevel: WritingsSubviewLevel
		switch self.subviewDelegate.currentLevel() {
			case .total: targetLevel = .detail
			case .detail: targetLevel = .total
		}
		self.subviewDelegate.changeLevel(to: targetLevel)
	}
}

extension Notification {
	static let EBWritingsArticleTitleDidPressed = Notification.Name(rawValue: "EBWritingsArticleTitleDidPressed")
	static let EBWritingsTagNameDidPressed = Notification.Name(rawValue: "EBWritingsTagNameDidPressed")
	static let EBWritingsSeriesNameDidPressed = Notification.Name(rawValue: "EBWritingsSeriesNameDidPressed")
}
