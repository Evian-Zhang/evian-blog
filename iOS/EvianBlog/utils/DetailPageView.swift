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
	@ObservedObject private var viewModel: DetailPageViewModel<Page>
	
	init(detailPageViewModel: DetailPageViewModel<Page>) {
		self.viewModel = detailPageViewModel
	}
	
	var detailBody: some View {
		ZStack(alignment: .bottomTrailing) {
			VStack(alignment: .leading) {
				Button(action: self.viewModel.deleteCurrentView) {
					HStack {
						Image(systemName: "xmark.circle.fill")
						Text("Close this page")
					}
				}
				Spacer()
				DetailPageViewController(controllers: self.viewModel.viewControllers, currentPage: self.$viewModel.currentPage)
			}
			DetailPageControl(numberOfPages: self.viewModel.viewControllers.count, currentPage: self.$viewModel.currentPage)
				.padding(.trailing)
		}
	}
	
	func content() -> AnyView {
		if self.viewModel.viewControllers.isEmpty {
			return AnyView(Text("No detail view").font(.largeTitle))
		} else {
			return AnyView(self.detailBody)
		}
	}
	
	var body: some View {
		self.content()
	}
}
