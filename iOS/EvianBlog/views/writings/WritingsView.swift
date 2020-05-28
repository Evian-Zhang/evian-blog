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
	private let tagView: TagView
	private let seriesView: SeriesView
	
	init(writingsViewModel: WritingsViewModel) {
		self.viewModel = writingsViewModel
		self.articleView = ArticleView(articleViewModel: writingsViewModel.articleViewModel)
		self.tagView = TagView(tagViewModel: writingsViewModel.tagViewModel)
		self.seriesView = SeriesView(seriesViewModel: writingsViewModel.seriesViewModel)
	}
	
	func contentOf(selectedWritings: WritingsSegment) -> AnyView {
		switch selectedWritings {
			case .article: return AnyView(self.articleView)
			case .tag: return AnyView(self.tagView)
			case .series: return AnyView(self.seriesView)
		}
	}

    var body: some View {
		NavigationView {
			self.contentOf(selectedWritings: self.viewModel.selectedWritingsSegment)
				.navigationBarItems(
					leading: Picker("Writings", selection: self.$viewModel.selectedWritingsSegment) {
						ForEach(WritingsSegment.allCases, id: \.self) { writingsSegment in
							Text(writingsSegment.description)
								.tag(writingsSegment)
						}
					}
						.pickerStyle(SegmentedPickerStyle()),
					trailing: HStack {
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
