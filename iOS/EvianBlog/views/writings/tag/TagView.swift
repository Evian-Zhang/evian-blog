//
//  TagView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/27.
//  Copyright © 2020 Evian张. All rights reserved.
//

import SwiftUI

struct TagView: View {
	@ObservedObject var viewModel: TagViewModel
	
	private let totalView: TagTotalView
	private let detailView: DetailPageView<ArticleListView>
	
	init(tagViewModel: TagViewModel) {
		self.viewModel = tagViewModel
		
		self.totalView = TagTotalView(tagTotalViewModel: tagViewModel.totalViewModel)
		self.detailView = DetailPageView(detailPageViewModel: tagViewModel.detailViewModel)
	}
	
	func content() -> AnyView {
		switch self.viewModel.level {
			case .total: return AnyView(self.totalView)
			case .detail: return AnyView(self.detailView)
		}
	}
	
	var body: some View {
		self.content()
	}
}

struct TagView_Previews: PreviewProvider {
    static var previews: some View {
        TagView(tagViewModel: TagViewModel(blogAPI: BlogAPI()))
    }
}
