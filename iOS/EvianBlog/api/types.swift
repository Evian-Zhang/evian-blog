//
//  types.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/18.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation

struct Tag: Decodable {
	let name: String
	let articleCount: UInt
	let lastReviseDate: UInt
}

struct Series: Decodable {
	let name: String
	let articleCount: UInt
	let lastReviseDate: UInt
}

struct ArticleMeta: Decodable {
	let title: String
	let publishDate: UInt
	let lastReviseDate: UInt
	let tags: [String]
	let series: String?
	let seriesIndex: UInt?
}

struct Article: Decodable {
	let title: String
	let body: String
	let publishDate: UInt
	let lastReviseDate: UInt
	let tags: [String]
	let series: String?
	let seriesIndex: UInt?
}

struct Project: Decodable {
	let name: String
	let description: String
	let languages: [String]
	let frameworks: [String]
	let url: URL
}
