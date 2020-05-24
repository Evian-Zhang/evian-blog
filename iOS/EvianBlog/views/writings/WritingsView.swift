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
		self.articleView = ArticleView(articleViewModel: writingsViewModel.articleViewModel)
	}
	
	func contentOf(selectedWritings: WritingsSegment) -> AnyView {
		switch selectedWritings {
			case .article: return AnyView(self.articleView)
			case .tag: return AnyView(Text("tags"))
			case .series: return AnyView(Text("series"))
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
					trailing: HStack {
						if self.viewModel.isCurrentViewClosable {
							Button(action: {
								self.viewModel.closeCurrentView()
							}) {
								Text("Close")
							}
								.buttonStyle(BorderlessButtonStyle())
						}
						Button(action: {
							self.viewModel.switchLevel()
						}) {
							Image(systemName: "list.bullet")
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
