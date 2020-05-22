//
//  WritingsViewDelegate.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/22.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation

protocol WritingsViewDelegate {
	func onNavigateToSeries(seriesName: String);
	func onNavigateToTag(tagName: String);
	func onNavigateToArticle(articleTitle: String);
}
