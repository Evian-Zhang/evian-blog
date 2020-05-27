//
//  DetailPageViewModel.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/24.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation
import SwiftUI

class DetailPageViewModel<Page: View>: ObservableObject {
	@Published var viewControllers: [UIHostingController<Page>] = []
	@Published var currentPage = 0
	
	init(_ views: [Page]) {
		self.viewControllers = views.map { UIHostingController(rootView: $0 ) }
	}
	
	func addView(_ view: Page) {
		self.viewControllers.append(UIHostingController(rootView: view))
		self.currentPage = self.viewControllers.count - 1
	}
	
	func deleteCurrentView() {
		let deletingPage = self.currentPage
		if self.viewControllers.count == 1 {
			self.currentPage = 0
		} else {
			self.currentPage = (self.currentPage + 1) % (self.viewControllers.count - 1)
		}
		self.viewControllers.remove(at: deletingPage)
	}
	
	func hasView(where predicate: (Page) -> Bool) -> Int? {
		return self.viewControllers.firstIndex(where: { viewController in
			predicate(viewController.rootView)
		})
	}
}
