//
//  ResumeView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/27.
//  Copyright © 2020 Evian张. All rights reserved.
//

import SwiftUI

struct ResumeView: View {
	@ObservedObject var viewModel: ResumeViewModel
	
	init(resumeViewModel: ResumeViewModel) {
		self.viewModel = resumeViewModel
		
		self.viewModel.fetchResume()
	}
	
	var successBody: some View {
		ScrollView {
			ArticleBodyView(body: self.viewModel.resume).font(.body)
		}
	}
	
	func indicatorOf(fetchStatus: ResumeViewModel.FetchStatus) -> AnyView {
		switch fetchStatus {
			case .fetching: return AnyView(Text("Loading...").font(.largeTitle))
			case .success: return AnyView(self.successBody)
			case .failure: return AnyView(VStack {
				Text("Failed to request.")
				Button("Reload", action: self.viewModel.fetchResume)
					.buttonStyle(BorderlessButtonStyle())
			}.font(.largeTitle))
		}
	}
	
	var body: some View {
		self.indicatorOf(fetchStatus: self.viewModel.fetchStatus)
	}
}

struct ResumeView_Previews: PreviewProvider {
    static var previews: some View {
        ResumeView(resumeViewModel: ResumeViewModel(blogAPI: BlogAPI()))
    }
}
