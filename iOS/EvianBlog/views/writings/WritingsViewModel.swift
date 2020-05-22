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

class WritingsViewModel: ObservableObject, WritingsViewDelegate {
	@Published var selectedWritingsSegment: WritingsSegment = .article
	let blogAPI: BlogAPI
	
	init(blogAPI: BlogAPI) {
		self.blogAPI = blogAPI
	}
	
	func onNavigateToTag(tagName: String) {
		
	}
	
	func onNavigateToSeries(seriesName: String) {
		
	}
	
	func onNavigateToArticle(articleTitle: String) {
		
	}
}
