//
//  ArticleBodyView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/26.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation
import SwiftUI
import UIKit

struct ArticleBodyView: UIViewRepresentable {
	let body: NSAttributedString
	
	func makeCoordinator() -> Coordinator {
		Coordinator(self)
	}
	
	func makeUIView(context: Context) -> UITextView {
		let textView = UITextView()
		textView.attributedText = self.body
		textView.isEditable = false
		textView.isScrollEnabled = false
		textView.delegate = context.coordinator
		// see https://forums.developer.apple.com/thread/117638 and https://stackoverflow.com/a/60278105/10005095
		textView.setContentCompressionResistancePriority(.defaultLow, for: .horizontal)
		
		return textView
	}
	
	func updateUIView(_ uiView: UITextView, context: Context) { }
	
	class Coordinator: NSObject, UITextViewDelegate {
		var parent: ArticleBodyView
		
		init(_ parent: ArticleBodyView) {
			self.parent = parent
		}
		
		func textView(_ textView: UITextView, shouldInteractWith URL: URL, in characterRange: NSRange, interaction: UITextItemInteraction) -> Bool {
			if URL.baseURL == nil {
				var target = URL.absoluteString
				if target.hasPrefix("./") {
					target = String(target.dropFirst(2))
				}
				NotificationCenter.default.post(name: Notification.EBWritingsArticleTitleDidPressed, object: nil, userInfo: ["title": target])
				return false
			} else {
				return true
			}
		}
	}
}
