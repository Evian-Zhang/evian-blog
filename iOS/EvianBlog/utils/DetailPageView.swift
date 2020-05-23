//
//  DetailPageView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/23.
//  Copyright © 2020 Evian张. All rights reserved.
//
//  From https://developer.apple.com/tutorials/swiftui/interfacing-with-uikit

import SwiftUI

struct DetailPageView<Page: View>: View {
	var viewControllers: [UIHostingController<Page>]
	@State var currentPage = 0
	
	init(_ views: [Page]) {
		self.viewControllers = views.map { UIHostingController(rootView: $0) }
	}
	
	func addView(_ view: Page) -> Int {
		self.viewControllers.append(UIHostingController(rootView: view))
		return self.viewControllers.count
	}
	
	var body: some View {
		ZStack(alignment: .bottomTrailing) {
			DetailPageViewController(controllers: viewControllers, currentPage: $currentPage)
			DetailPageControl(numberOfPages: viewControllers.count, currentPage: $currentPage)
				.padding(.trailing)
		}
	}
}
