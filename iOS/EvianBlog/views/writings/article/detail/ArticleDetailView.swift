//
//  ArticleDetailView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/23.
//  Copyright © 2020 Evian张. All rights reserved.
//

import SwiftUI

struct ArticleDetailView: View {
	@ObservedObject private var viewModel: ArticleDetailViewModel
	
	init(articleDetailViewModel: ArticleDetailViewModel) {
		self.viewModel = articleDetailViewModel
	}
	
    var body: some View {
		Text(self.viewModel.articleTitle)
    }
}

struct ArticleDetailView_Previews: PreviewProvider {
    static var previews: some View {
        ArticleDetailView(articleDetailViewModel: ArticleDetailViewModel(blogAPI: BlogAPI(), articleTitle: "A title"))
    }
}
