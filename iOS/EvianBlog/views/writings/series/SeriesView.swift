//
//  SeriesView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/27.
//  Copyright © 2020 Evian张. All rights reserved.
//

import SwiftUI

struct SeriesView: View {
	@ObservedObject var viewModel: SeriesViewModel
	
	private let totalView: SeriesTotalView
	private let detailView: DetailPageView<ArticleListView>
	
	init(seriesViewModel: SeriesViewModel) {
		self.viewModel = seriesViewModel
		
		self.totalView = SeriesTotalView(seriesTotalViewModel: seriesViewModel.totalViewModel)
		self.detailView = DetailPageView(detailPageViewModel: seriesViewModel.detailViewModel)
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

struct SeriesView_Previews: PreviewProvider {
    static var previews: some View {
        SeriesView(seriesViewModel: SeriesViewModel(blogAPI: BlogAPI()))
    }
}
