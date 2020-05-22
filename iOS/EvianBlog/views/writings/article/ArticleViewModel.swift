//
//  ArticleViewModel.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/20.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation
import Combine

class ArticleViewModel: ObservableObject {
	@Published var articles: [ArticleMeta] = []
	@Published var fetchStatus: FetchStatus = .success
	
	enum FetchStatus {
		case fetching
		case success
		case failure
	}
	
	private static let PAGE_SIZE: UInt = 20
	
	private let blogAPI: BlogAPI
	let writingsViewDelegate: WritingsViewDelegate
	// used to store `AnyCancellable`,  without keeping this reference alive, the network publisher will terminate immediately
	private var disposables = Set<AnyCancellable>()
	// page index of NEXT page index
	private var pageIndex: UInt = 0
	private var reachEnd = false
	
	init(blogAPI: BlogAPI, writingsViewDelegate: WritingsViewDelegate) {
		self.blogAPI = blogAPI
		self.writingsViewDelegate = writingsViewDelegate
	}
	
	func fetchMoreArticles() {
		// only fetch when not reach end and not being fetching
		guard !self.reachEnd && self.fetchStatus != .fetching else { return }
		
		self.fetchStatus = .fetching
		self.blogAPI.getArticleMetas(pageIndex: self.pageIndex, pageSize: ArticleViewModel.PAGE_SIZE)
			.receive(on: DispatchQueue.main)
			.sink(
				receiveCompletion: { [weak self] completion in
					guard let self = self else { return }
					switch completion {
						case .finished:
							self.fetchStatus = .success
						case .failure(let blogAPIError):
							print("fetch failure: \(blogAPIError)")
							self.fetchStatus = .failure
					}
				},
				receiveValue: { [weak self] newArticles in
					guard let self = self else { return }
					if newArticles.isEmpty {
						self.reachEnd = true
					} else {
						self.pageIndex += 1
						self.articles.append(contentsOf: newArticles)
					}
			})
			.store(in: &self.disposables)
	}
}
