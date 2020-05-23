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
	
	let blogAPI: BlogAPI
	// used to store `AnyCancellable`,  without keeping this reference alive, the publisher will terminate immediately
	private var disposables = Set<AnyCancellable>()
	
	init(blogAPI: BlogAPI) {
		self.blogAPI = blogAPI
		
		self.observeArticleTitlePressed()
		self.observeTagNamePressed()
		self.observeSeriesNamePressed()
	}
	
	func observeArticleTitlePressed() {
		NotificationCenter.default.publisher(for: Notification.EBWritingsArticleTitleDidPressed)
			.map { notification in
				notification.userInfo!["title"] as! String
			}
			.sink { articleTitle in
				self.selectedWritingsSegment = .article
				
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
				
			}
			.store(in: &self.disposables)
	}
}

extension Notification {
	static let EBWritingsArticleTitleDidPressed = Notification.Name(rawValue: "EBWritingsArticleTitleDidPressed")
	static let EBWritingsTagNameDidPressed = Notification.Name(rawValue: "EBWritingsTagNameDidPressed")
	static let EBWritingsSeriesNameDidPressed = Notification.Name(rawValue: "EBWritingsSeriesNameDidPressed")
}
