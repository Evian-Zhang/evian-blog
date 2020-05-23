//
//  DetailPageViewController.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/23.
//  Copyright © 2020 Evian张. All rights reserved.
//
//  From https://developer.apple.com/tutorials/swiftui/interfacing-with-uikit

import Foundation
import SwiftUI
import UIKit

struct DetailPageViewController: UIViewControllerRepresentable {
	var controllers: [UIViewController]
	@Binding var currentPage: Int
	
	func makeCoordinator() -> Coordinator {
		Coordinator(self)
	}
	
	func makeUIViewController(context: Context) -> UIPageViewController {
		let pageViewController = UIPageViewController(transitionStyle: .scroll, navigationOrientation: .horizontal)
		pageViewController.dataSource = context.coordinator
		pageViewController.delegate = context.coordinator
		
		return pageViewController
	}
	
	func updateUIViewController(_ pageViewController: UIPageViewController, context: Context) {
		pageViewController.setViewControllers([controllers[currentPage]], direction: .forward, animated: true)
	}
	
	class Coordinator: NSObject, UIPageViewControllerDataSource, UIPageViewControllerDelegate {
		var parent: DetailPageViewController
		
		init(_ pageViewController: DetailPageViewController) {
			self.parent = pageViewController
		}
		
		func pageViewController(_ pageViewController: UIPageViewController, viewControllerBefore viewController: UIViewController) -> UIViewController? {
			guard let index = parent.controllers.firstIndex(of: viewController) else {
				return nil
			}
			if index == 0 {
				return parent.controllers.last
			}
			return parent.controllers[index - 1]
		}
		
		func pageViewController(_ pageViewController: UIPageViewController, viewControllerAfter viewController: UIViewController) -> UIViewController? {
			guard let index = parent.controllers.firstIndex(of: viewController) else {
				return nil
			}
			if index + 1 == parent.controllers.count {
				return parent.controllers.first
			}
			return parent.controllers[index + 1]
		}
		
		func pageViewController(_ pageViewController: UIPageViewController, didFinishAnimating finished: Bool, previousViewControllers: [UIViewController], transitionCompleted completed: Bool) {
			if completed, let visibleViewController = pageViewController.viewControllers?.first, let index = parent.controllers.firstIndex(of: visibleViewController) {
				parent.currentPage = index
			}
		}
	}
}
