//
//  WritingsSubviewDelegate.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/23.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation

enum WritingsSubviewLevel {
	case total
	case detail
}

protocol WritingsSubviewDelegate {
	func currentLevel() -> WritingsSubviewLevel
	func changeLevel(to writingsSubviewLevel: WritingsSubviewLevel)
}
