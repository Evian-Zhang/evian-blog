//
//  WritingsView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import SwiftUI

struct WritingsView: View {
	@ObservedObject private var viewModel: WritingsViewModel
	
	private let articleView: ArticleView
	
	init(writingsViewModel: WritingsViewModel) {
		self.viewModel = writingsViewModel
		self.articleView = ArticleView(articleViewModel: ArticleViewModel(blogAPI: writingsViewModel.blogAPI))
	}
	
	func contentOf(selectedWritings: WritingsSegment) -> AnyView {
		switch selectedWritings {
			case .article: return AnyView(self.articleView)
			case .tag: return AnyView(Text("tags"))
			case .series: return AnyView(Text("series"))
		}
	}
	
	func subviewDelegateOf(selectedWritings: WritingsSegment) -> WritingsSubviewDelegate {
		switch selectedWritings {
			case .article: return self.articleView.viewModel
			default: return self.articleView.viewModel
		}
	}

    var body: some View {
		NavigationView {
			self.contentOf(selectedWritings: self.viewModel.selectedWritingsSegment)
				.navigationBarItems(
					leading: Picker("Writings", selection: self.$viewModel.selectedWritingsSegment) {
						ForEach(WritingsSegment.allCases, id: \.self) { writingsSegment in
							Text(String(describing: writingsSegment))
								.tag(writingsSegment)
						}
					}
						.pickerStyle(SegmentedPickerStyle()),
					trailing: Button(action: {
						self.viewModel.switchLevel(subviewDelegate: self.subviewDelegateOf(selectedWritings: self.viewModel.selectedWritingsSegment))
					}) {
//						Image(systemName: "list.bullet")
						Stepper(onIncrement: {
							
						}, onDecrement: {
							
						}) {
							Text("zs")
						}
					}
				)
		}
    }
}

struct WritingsView_Previews: PreviewProvider {
	static let writingsViewModel = WritingsViewModel(blogAPI: BlogAPI())
    static var previews: some View {
        WritingsView(writingsViewModel: writingsViewModel)
    }
}
