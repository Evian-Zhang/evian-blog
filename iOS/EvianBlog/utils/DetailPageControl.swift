//
//  DetailPageControl.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/23.
//  Copyright © 2020 Evian张. All rights reserved.
//
//  From https://developer.apple.com/tutorials/swiftui/interfacing-with-uikit

import SwiftUI
import UIKit

struct DetailPageControl: UIViewRepresentable {
	var numberOfPages: Int
	@Binding var currentPage: Int
	
	func makeCoordinator() -> Coordinator {
		Coordinator(self)
	}
	
	func makeUIView(context: Context) -> UIPageControl {
		let control = UIPageControl()
		
		control.pageIndicatorTintColor = UIColor.label.withAlphaComponent(0.4)
		control.currentPageIndicatorTintColor = UIColor.label
		
		control.numberOfPages = numberOfPages
		control.addTarget(context.coordinator, action: #selector(Coordinator.updateCurrentPage(sender:)), for: .valueChanged)
		
		return control
	}
	
	func updateUIView(_ uiView: UIPageControl, context: Context) {
		uiView.currentPage = currentPage
	}
	
	class Coordinator: NSObject {
		var control: DetailPageControl
		
		init(_ control: DetailPageControl) {
			self.control = control
		}
		
		@objc func updateCurrentPage(sender: UIPageControl) {
			control.currentPage = sender.currentPage
		}
	}
}

