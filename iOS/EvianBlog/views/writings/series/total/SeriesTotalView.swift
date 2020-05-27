//
//  SeriesTotalView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/27.
//  Copyright © 2020 Evian张. All rights reserved.
//

import SwiftUI

struct SeriesTotalView: View {
	@ObservedObject var viewModel: SeriesTotalViewModel
	
	private let dateFormatter = DateFormatter()
	
	init(seriesTotalViewModel: SeriesTotalViewModel) {
		self.dateFormatter.dateStyle = .long
		self.dateFormatter.timeStyle = .none
		self.dateFormatter.locale = Locale.current
		
		self.viewModel = seriesTotalViewModel
		
		self.viewModel.fetchSeries()
	}
	
	func dateStringOf(timeInterval: UInt) -> String {
		let date = Date(timeIntervalSince1970: TimeInterval(timeInterval))
		return self.dateFormatter.string(from: date)
	}
	
	func indicatorOf(fetchStatus: SeriesTotalViewModel.FetchStatus) -> AnyView {
		switch fetchStatus {
			case .fetching: return AnyView(Text("Loading...").font(.largeTitle))
			case .success: return AnyView(EmptyView())
			case .failure: return AnyView(VStack {
				Text("Failed to request.")
				Button("Reload", action: self.viewModel.fetchSeries)
					.buttonStyle(BorderlessButtonStyle())
			}.font(.largeTitle))
		}
	}
	
	var body: some View {
		List {
			ForEach(self.viewModel.series, id: \.name) { series in
				VStack(alignment: HorizontalAlignment.leading) {
					Button(action: {
						self.viewModel.onSeriesPressed(seriesName: series.name)
					}) {
						Text(series.name)
							.font(.headline)
							.fixedSize(horizontal: false, vertical: true)
					}
					Text("\(series.articleCount) articles").font(.subheadline)
					Text("Last revised at \(self.dateStringOf(timeInterval: series.lastReviseDate))")
						.font(.subheadline)
						.fixedSize(horizontal: false, vertical: true)
				}
			}
			self.indicatorOf(fetchStatus: self.viewModel.fetchStatus)
		}
	}
}

struct SeriesTotalView_Previews: PreviewProvider {
    static var previews: some View {
        SeriesTotalView(seriesTotalViewModel: SeriesTotalViewModel(blogAPI: BlogAPI()))
    }
}
