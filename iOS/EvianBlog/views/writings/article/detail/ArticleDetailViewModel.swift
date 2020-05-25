//
//  ArticleDetailViewModel.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/23.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation
import Combine

class ArticleDetailViewModel: ObservableObject {
	@Published var fetchStatus: FetchStatus = .failure
	
	enum FetchStatus {
		case fetching
		case success
		case failure
	}
	
	private let blogAPI: BlogAPI
	let articleTitle: String
	var article: Article?
	var body: String {
		self.article?.body ?? ""
	}
	var lastReviseDate: UInt {
		self.article?.lastReviseDate ?? 0
	}
	var tags: [String] {
		self.article?.tags ?? []
	}
	var series: String? {
		self.article?.series
	}
	var seriesIndex: UInt? {
		self.article?.seriesIndex
	}
	// used to store `AnyCancellable`, without keeping this reference alive, the network publisher will terminate immediately
	private var disposables = Set<AnyCancellable>()
	
	init(blogAPI: BlogAPI, articleTitle: String) {
		self.blogAPI = blogAPI
		self.articleTitle = articleTitle
		self.article = nil
	}
	
	func fetchArticle() {
		guard self.article == nil && self.fetchStatus != .fetching else { return }
		
		self.fetchStatus = .fetching
		self.blogAPI.getArticle(title: self.articleTitle)
			.receive(on: DispatchQueue.main)
			.sink(receiveCompletion: { [weak self] completion in
				guard let self = self else { return }
				switch completion {
					case .finished:
						self.fetchStatus = .success
					case .failure(let blogAPIError):
						print("fetch failure: \(blogAPIError)")
						self.fetchStatus = .failure
				}
			}) { [weak self] article in
				guard let self = self else { return }
				self.article = article
			}
			.store(in: &self.disposables)
	}
	
	func onSeriesPressed(seriesName: String) {
		NotificationCenter.default.post(name: Notification.EBWritingsSeriesNameDidPressed, object: nil, userInfo: ["name": seriesName])
	}
	
	func onTagPressed(tagName: String) {
		NotificationCenter.default.post(name: Notification.EBWritingsTagNameDidPressed, object: nil, userInfo: ["name": tagName])
	}
	
	func onArticlePressed(articleTitle: String) {
		NotificationCenter.default.post(name: Notification.EBWritingsArticleTitleDidPressed, object: nil, userInfo: ["title": articleTitle])
	}
}
