//
//  TagTotalView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/27.
//  Copyright © 2020 Evian张. All rights reserved.
//

import SwiftUI

struct TagTotalView: View {
	@ObservedObject var viewModel: TagTotalViewModel
	
	private let dateFormatter = DateFormatter()
	
	init(tagTotalViewModel: TagTotalViewModel) {
		self.dateFormatter.dateStyle = .long
		self.dateFormatter.timeStyle = .none
		self.dateFormatter.locale = Locale.current
		
		self.viewModel = tagTotalViewModel
		
		self.viewModel.fetchTags()
	}
	
	func dateStringOf(timeInterval: UInt) -> String {
		let date = Date(timeIntervalSince1970: TimeInterval(timeInterval))
		return self.dateFormatter.string(from: date)
	}
	
	var successBody: some View {
		ScrollView {
			VStack(spacing: 10) {
				ForEach(self.viewModel.tags, id: \.name) { tag in
					VStack {
						Button(action: {
							self.viewModel.onTagPressed(tagName: tag.name)
						}) {
							Text(tag.name)
								.font(.headline)
								.fixedSize(horizontal: false, vertical: true)
						}
						Text("\(tag.articleCount) articles").font(.subheadline)
						Text("Last revised at \(self.dateStringOf(timeInterval: tag.lastReviseDate))")
							.font(.subheadline)
							.fixedSize(horizontal: false, vertical: true)
					}
						.frame(width: 300, height: 200)
						.overlay(RoundedRectangle(cornerRadius: 15).stroke(lineWidth: 2))
				}
			}
		}
	}
	
	func indicatorOf(fetchStatus: TagTotalViewModel.FetchStatus) -> AnyView {
		switch fetchStatus {
			case .fetching: return AnyView(Text("Loading...").font(.largeTitle))
			case .success: return AnyView(self.successBody)
			case .failure: return AnyView(VStack {
				Text("Failed to request.")
				Button("Reload", action: self.viewModel.fetchTags)
					.buttonStyle(BorderlessButtonStyle())
			}.font(.largeTitle))
		}
	}
	
    var body: some View {
		self.indicatorOf(fetchStatus: self.viewModel.fetchStatus)
    }
}

struct TagTotalView_Previews: PreviewProvider {
    static var previews: some View {
        TagTotalView(tagTotalViewModel: TagTotalViewModel(blogAPI: BlogAPI()))
    }
}
