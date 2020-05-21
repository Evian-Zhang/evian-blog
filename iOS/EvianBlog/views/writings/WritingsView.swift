//
//  WritingsView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import SwiftUI

enum Writings: CaseIterable, CustomStringConvertible {
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

struct WritingsView: View {
	@State private var selectedWritings = Writings.article
	
	private let blogAPI: BlogAPI
	
	private let articleView: ArticleView
	
	init() {
		self.blogAPI = BlogAPI()
		self.articleView = ArticleView(viewModel: ArticleViewModel(blogAPI: self.blogAPI))
	}
	
	func contentOf(selectedWritings: Writings) -> AnyView {
		switch selectedWritings {
			case .article: return AnyView(self.articleView)
			case .tag: return AnyView(Text("tags"))
			case .series: return AnyView(Text("series"))
		}
	}

    var body: some View {
		NavigationView {
			self.contentOf(selectedWritings: self.selectedWritings)
				.navigationBarItems(leading:
					Picker("Writings", selection: $selectedWritings) {
						ForEach(Writings.allCases, id: \.self) { writingsKey in
							Text(String(describing: writingsKey))
								.tag(writingsKey)
						}
					}
						.pickerStyle(SegmentedPickerStyle())
				)
		}
    }
}

struct WritingsView_Previews: PreviewProvider {
    static var previews: some View {
        WritingsView()
    }
}
